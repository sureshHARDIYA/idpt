const fs = require('fs');
const csv = require('fast-csv');
const Plot = require('nodeplotlib');

const analyze = (data) => {
    const timeStart = data.timestamp;
    const duration = parseInt(data.data.length / data.frequency);
    const timeEnd = parseInt(timeStart) + duration;

    return {type: data.type,
        timeStart: new Date(timeStart * 1000),
        timeEnd: new Date(timeEnd * 1000),
        patient: data.patient,
        score: 69,
        dataId: data._id}
};

console.log(__dirname);
var csvData = [];
fs.createReadStream('./src/analysis/EDA2.csv')
    .pipe(csv.parse({ headers: false }))
    .on('error', error => console.error(error))
    .on('data', row => csvData.push(row))
    .on('end', () => processCSV(csvData))

const processCSV = (data) => {
    //console.log(data);
    const daft = [
        {
          x: [...Array(data.length).keys()],
          y: data,
          type: 'scatter',
        },
      ];
      
      Plot.plot(daft);
}

exports.analyze = analyze;