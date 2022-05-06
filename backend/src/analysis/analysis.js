const fs = require('fs');
const csv = require('fast-csv');
const Plot = require('nodeplotlib');
var Fili = require('fili');

const DEBUG = false;
const DEBUG_FREQUENCY = 4;
const THRESHOLD = 3.75;

const analyze = (datas) => {
  const EDAdata = datas[0];
  const TEMPdata = datas[1];

  console.log(">>> We got data in analysis <<<");
  console.log(JSON.stringify(EDAdata));

  //const timeStart = EDAdata.timestamp;
  const frequency = Math.round(1000 / EDAdata.fhir.valueSampledData.period);
  console.log("LENGTH");
  console.log(EDAdata.fhir.valueSampledData.data.length);

  const duration = Math.round(EDAdata.fhir.valueSampledData.data.length / frequency);
  //const timeEnd = parseInt(timeStart) + duration;
  console.log("freq, dur");
  console.log(frequency + ", " + duration);

  const score = calculateScore(datas, duration, frequency);

  console.log("score");
  console.log(score);

  /*return createJSON(dateFormater(new Date(timeStart * 1000)),
    dateFormater(new Date(timeEnd * 1000)), EDAdata.patientName, EDAdata.patientId,
    parseFloat(score.toFixed(2)), EDAdata._id + ", " + TEMPdata._id);

  return createFhirJSON(dateFormater(new Date(timeStart * 1000)),
    dateFormater(new Date(timeEnd * 1000)), EDAdata.patientName, EDAdata.patientId,
    parseFloat(score.toFixed(2)), EDAdata._id, TEMPdata._id);*/

  const fhirJSON = createFhirJSON(EDAdata.fhir.effectivePeriod.start,
    EDAdata.fhir.effectivePeriod.end, EDAdata.fhir.subject.display, EDAdata.fhir.subject.reference.reference,
    parseFloat(score.toFixed(2)), EDAdata._id, TEMPdata._id);

  console.log(JSON.stringify(fhirJSON));

  return fhirJSON;
};

const createFhirJSON = (timeStart, timeEnd, patientName, patientId, score, EdaId, TempId) => {
  return {
    fhir: {
      resourceType: 'Observation',
      status: 'final',
      code: {
        coding: {
          system: null,
          display: 'Stress',
        },
        text: 'A proprietary stress score derived from analysed wearable sensor data'
      },
      subject: {
        reference: {
          reference: patientId
        },
        type: 'Patient',
        display: patientName
      },
      effectivePeriod: {
        start: timeStart,
        end: timeEnd
      },
      device : {
        display: 'Empatica E4'
      },
      valueString: score,
      derivedFrom: {
        references: [
          {
            reference: EdaId,
            text: 'Reference to EDA raw data ID in database'
          },
          {
            reference: TempId,
            text: 'Reference to ST raw data ID in database'
          }
        ]
      }
    }
  };
};

const createJSON = (timeStart, timeEnd, patientName, patientId, score, dataId) => {
  return {dataType: 'Stress',
          timeStart: timeStart,
          timeEnd: timeEnd,
          patientName: patientName,
          patientId: patientId,
          score: score,
          dataId: dataId};
};

if (DEBUG) {
  var csvData = [];
  fs.createReadStream('./src/analysis/EDA.csv')
      .pipe(csv.parse({ headers: false }))
      .on('error', error => console.error(error))
      .on('data', row => csvData.push(row))
      .on('end', () => calculateScore([].concat.apply([], csvData), csvData.length / DEBUG_FREQUENCY, DEBUG_FREQUENCY));
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
      downsampled.push(average);
      sum = 0;
    }
  }
  return downsampled;
}

const calculateScore = (datas, duration, frequency) => {
  const EDAdata = datas[0].fhir.valueSampledData.data;
  const preProcessedEDA = preProcess(EDAdata, frequency, 1, 5, 0.05);

  const TEMPdata = datas[1].fhir.valueSampledData.data;
  const preProcessedTEMP = preProcess(TEMPdata, frequency, 2, 1, 0.1);

  // Calculating scores per second for EDA
  const extrema = find_extrema(preProcessedEDA);
  const amplitude_scores = amplitude_increase(preProcessedEDA);
  const rising_scores = rising_time(preProcessedEDA, extrema);
  const response_scores = response_slope(preProcessedEDA, extrema);

  // Calculating scores per second for TEMP
  const temperature_decrease_scores = temperature_decrease(preProcessedTEMP, extrema);

  
  var scores = [];
  for (let i = 0; i < preProcessedEDA.length; i++)
    scores.push(amplitude_scores[i] + rising_scores[i] + response_scores[i] + 
      temperature_decrease_scores[i]);

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
    const plot_data = [
        {
          x: [...Array(preProcessedEDA.length).keys()],
          y: preProcessedEDA, // preProcessedEDA or scores
          type: 'line',
        },
      ];
    Plot.plot(plot_data);
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

const temperature_decrease = (y, extrema) => {
  n = y.length;
  scores = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (extrema[i] == -1) {
      var pointer = i + 2;

      while (pointer - i <= 6 && pointer < n - 2) {
        if (y[pointer] > y[pointer + 1] > y[pointer + 2]) {
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

/*
const dateFormater = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}
*/

exports.analyze = analyze;