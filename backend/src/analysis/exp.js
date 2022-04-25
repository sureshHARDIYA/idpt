const fs = require('fs');
const csv = require('fast-csv');
const Plot = require('nodeplotlib');
var Fili = require('fili');

const DEBUG = true;
const DEBUG_FREQUENCY = 4;
const THRESHOLD = 3.75;

if (DEBUG) {
  var EDAData = [];
  var TEMPData = [];
  fs.createReadStream('./EDA.csv')
      .pipe(csv.parse({ headers: false }))
      .on('error', error => console.error(error))
      .on('data', row => EDAData.push(row[0]))
        .on('end', () => fs.createReadStream('./TEMP.csv')
        .pipe(csv.parse({ headers: false }))
        .on('error', error => console.error(error))
        .on('data', row => TEMPData.push(row[0]))
        .on('end', () => calculateScore([EDAData, TEMPData], EDAData.length / DEBUG_FREQUENCY, DEBUG_FREQUENCY))
            );
}

const preProcess = (data, frequency, order, low_cutoff_freq, high_cutoff_freq) => {
    data = data.map((i) => parseFloat(i));

  //  Instance of a filter coefficient calculator
  var iirCalculator = new Fili.CalcCascades();

  // calculate filter coefficients
  var LPFilterCoeffs = iirCalculator.lowpass({
    order: order,
    characteristic: 'butterworth',
    Fs: frequency, // sampling frequency
    Fc: low_cutoff_freq, // cutoff frequency
    gain: 0,
    preGain: false
  });

  // create a filter instance from the calculated coeffs
  var LPfilter = new Fili.IirFilter(LPFilterCoeffs);

  var HPFilterCoeffs = iirCalculator.highpass({
    order: order,
    characteristic: 'butterworth',
    Fs: frequency, // sampling frequency
    Fc: high_cutoff_freq, // cutoff frequency
    gain: 0,
    preGain: false
  });
  var HPfilter = new Fili.IirFilter(HPFilterCoeffs);

  data = HPfilter.multiStep(LPfilter.multiStep(data));

  downsampled = [];
  sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];

    if ((i + 1) % frequency == 0) {
      average = sum/frequency;
      if (average < -0.01) {
        downsampled.push(-0.01);
      } else if (average > 0.03) {
        downsampled.push(0.03);
      } else {
        downsampled.push(average);
      }
      sum = 0;
    }
  }
  return downsampled;
}

const calculateScore = (datas, duration, frequency) => {
    console.log(datas[0]);
  var EDAdata = datas[0];
  EDAdata = EDAdata.slice(2);
  const preProcessedEDA = preProcess(EDAdata, frequency, 1, 5, 0.05);

  var TEMPdata = datas[1];
  TEMPdata = TEMPdata.slice(2);
  const preProcessedTEMP = preProcess(TEMPdata, frequency, 2, 1, 0.1);

  // Calculating scores per second for EDA
  const extrema = find_extrema(preProcessedEDA);
  const amplitude_scores = amplitude_increase(preProcessedEDA).map((i) => i * 25);
  const rising_scores = rising_time(preProcessedEDA, extrema).map((i) => i * 15);
  const response_scores = response_slope(preProcessedEDA, extrema).map((i) => i * 50);

  // Calculating scores per second for TEMP
  const temperature_decrease_scores = temperature_decrease(preProcessedTEMP, extrema).map((i) => i * 10);

  
  var scores = [];
  for (let i = 0; i < preProcessedEDA.length; i++)
    scores.push(amplitude_scores[i] + rising_scores[i] + response_scores[i] + temperature_decrease_scores[i]);

  scores = frequency_limiter(scores);
  
  // Calculating final score
  var mos = 0;
  for (let i = 0; i < preProcessedEDA.length; i++)
    if (scores[i] >= THRESHOLD)
      mos += 1;

  // Average MOS/min
  const score = mos * 60 / duration;
  
  
  if (DEBUG) {
    // Plotting
    const plot_EDA = 
        {
          x: [...Array(preProcessedEDA.length).keys()],
          y: preProcessedEDA, // preProcessedEDA or scores
          type: 'line',
        };
    

    const plot_scores = 
        {
          x: [...Array(preProcessedEDA.length).keys()],
          y: response_scores.map((i) => i * 0.001), // preProcessedEDA or scores
          type: 'line',
        };

    const plot_extrema = 
        {
          x: [...Array(preProcessedEDA.length).keys()],
          y: extrema.map((i) => i * 0.01), // preProcessedEDA or scores
          type: 'line',
        };

    const plot_TEMP = 
        {
          x: [...Array(preProcessedEDA.length).keys()],
          y: TEMPdata, // preProcessedEDA or scores
          type: 'line',
        };
        Plot.plot([plot_scores, plot_EDA]);
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
        if (2 <= counter && counter <= 5) {
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
          if (1 < pointer - i && pointer - i <= 5) {
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
          var slope = Math.atan((y[pointer] - y[i]) / (pointer - i));
          if (slope >= 0.01) {
            scores[i] = 1.0;
          } else if (slope > 0.008) {
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

const temperature_decrease = (y, extrema) => {
  n = y.length;
  scores = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (extrema[i] == 1) {
      var pointer = i + 2;

      while (pointer - i <= 6 && pointer < n - 2) {
        if (y[pointer] > y[pointer + 1] && y[pointer + 1] > y[pointer + 2]) {
          if (pointer - i < 3){
            scores[i] = 1.0;
          }
          else {
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

  for (let j = max_score; j >= THRESHOLD; j -= 5) {
    current_max = j / 10;
    for (let i = 0; i < n; i++) {
      if (scores[i] == current_max) {
        var pointer = i + 1;

        while (pointer - i <= 10 && pointer < n) {
          if (scores[pointer] <= current_max) {
            scores[pointer] =  0;
          }
          pointer += 1;
        }
      }
    }
  }
  return scores;
}
