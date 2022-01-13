const fs = require('fs');
const csv = require('fast-csv');
const Plot = require('nodeplotlib');
var Fili = require('fili');

const DEBUG = false;
const DEBUG_FREQUENCY = 4;
const THRESHOLD = 2.0;

const analyze = (data) => {
  const timeStart = data.timestamp;
  const duration = parseInt(data.data.length / data.frequency);
  const timeEnd = parseInt(timeStart) + duration;

  const score = calculateScore(data.data, duration, data.frequency);

  return {type: data.type,
      timeStart: dateFormater(new Date(timeStart * 1000)),
      timeEnd: dateFormater(new Date(timeEnd * 1000)),
      patient: data.patient,
      score: score,
      dataId: data._id}
};

if (DEBUG) {
  var csvData = [];
  fs.createReadStream('./src/analysis/EDA.csv')
      .pipe(csv.parse({ headers: false }))
      .on('error', error => console.error(error))
      .on('data', row => csvData.push(row))
      .on('end', () => calculateScore([].concat.apply([], csvData), csvData.length / DEBUG_FREQUENCY, DEBUG_FREQUENCY));
}

const calculateScore = (data, duration, frequency) => {
  data = data.map((i) => parseFloat(i));

  //  Instance of a filter coefficient calculator
  var iirCalculator = new Fili.CalcCascades();

  // calculate filter coefficients
  var LPFilterCoeffs = iirCalculator.lowpass({
    order: 1,
    characteristic: 'butterworth',
    Fs: frequency, // sampling frequency
    Fc: 5, // cutoff frequency
    gain: 0,
    preGain: false
  });

  // create a filter instance from the calculated coeffs
  var LPfilter = new Fili.IirFilter(LPFilterCoeffs);

  var HPFilterCoeffs = iirCalculator.highpass({
    order: 1,
    characteristic: 'butterworth',
    Fs: frequency, // sampling frequency
    Fc: 0.05, // cutoff frequency
    gain: 0,
    preGain: false
  });
  var HPfilter = new Fili.IirFilter(HPFilterCoeffs);

  data = LPfilter.multiStep(HPfilter.multiStep(data));

  // Downsampling to 1 Hz
  downsampled = [];
  sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];

    if ((i + 1) % frequency == 0) {
      sum = sum/frequency
      // TODO: Remove value caps
      if (sum > 0.4)
        downsampled.push(0.4);
      else if (sum < -0.4)
        downsampled.push(-0.4);
      else
        downsampled.push(sum);
      sum = 0;
    }
  }

  // Calculating scores per second
  const amplitude_scores = amplitude_increase(downsampled);
  const extrema = find_extrema(downsampled);
  const rising_scores = rising_time(downsampled, extrema);
  const response_scores = response_slope(downsampled, extrema);

  var scores = [];
  for (let i = 0; i < downsampled.length; i++)
    scores.push(amplitude_scores[i] + rising_scores[i] + response_scores[i]);

  scores = frequency_limiter(scores);
  
  // Calculating final score
  var mos = 0;
  for (let i = 0; i < downsampled.length; i++)
    if (scores[i] >= THRESHOLD)
      mos += 1;

  // Average MOS/min
  const score = mos * 60 / duration;
  
  
  if (DEBUG) {
    // Plotting
    const daft = [
        {
          x: [...Array(downsampled.length).keys()],
          y: downsampled, // downsampled or scores
          type: 'line',
        },
      ];
    Plot.plot(daft);
  }

  return score;
};

const amplitude_increase = (y) => {
  const n = y.length;
  var scores = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    var pointer = i + 1;
    var counter = 0;
    while (pointer - i <= 6 && pointer < n) {
      if (y[pointer] > y[pointer - 1]) {
        counter += 1;
      } else {
        if (2 <= counter <= 5) {
          scores[i] = 1.0;

        } else if (counter > 5) {
          scores[i] = 0.5;
        }
        break;
      }
      pointer += 1;
    }
  }
  return scores;
}

const find_extrema = (y) => {
  const n = y.length;
  var extrema = Array(n).fill(0);

  for (let i = 1; i < n-1; i++) {

    if (y[i-1] < y[i] && y[i] > y[i+1])
      extrema[i] = 1;
    else if (y[i-1] > y[i] && y[i] < y[i+1])
      extrema[i] = -1;
  }
  return extrema;
}

const rising_time = (y, extrema) => {
  const n = y.length;
  var scores = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (extrema[i] == -1) {
      var pointer = i + 1;

      while (pointer - i <= 10 && pointer < n) {
        if (extrema[pointer] == 1) {
          if (1 < pointer - i <= 5) {
            scores[i] = 1.0;
          } else if (pointer - i > 5) {
            scores[i] = 0.5;
          }
          break;
        }
        pointer += 1;
      }
    }
  }
  return scores;
}

const response_slope = (y, extrema) => {
  n = y.length;
  scores = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (extrema[i] == -1) {
      var pointer = i + 1;

      while (pointer - i <= 10 && pointer < n) {
        if (extrema[pointer] == 1) {
          if (1 < (y[pointer] - y[i]) / (pointer - i) >= 2.777) {
            scores[i] = 1.0;
          } else if (1 < (y[pointer] - y[i]) / (pointer-i) > 2.222) {
            scores[i] = 0.5;
          }
          break;
        }
        pointer += 1;
      }
    }
  }
  return scores;
}

const frequency_limiter = (scores) => {
  const n = scores.length;
  const max_score = Math.max(...scores) * 10;

  for (let j = max_score; j > 5; j -= 5) {
    j = j / 10;
    for (let i = 0; i < n; i++) {
      if (scores[i] == j) {
        var pointer = i + 1;

        while (pointer - i <= 10 && pointer < n) {
          if (scores[pointer] <= j) {
            scores[pointer] = 0;
          }
          pointer += 1;
        }
      }
    }
    j = j * 10;
  }
  return scores;
}

const dateFormater = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return year + '-' + month + '-' + day;
}

exports.analyze = analyze;