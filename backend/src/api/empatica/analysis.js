const EmpaticaService = require('../../services/empaticaService')
const csv = require('csv-parser');
const fs = require('fs');

reader();

async function reader() {
    const serv = new EmpaticaService(null, null);
    console.log(await serv.findById("61a75059a6c7bb14086f05ff"));

    /* 
    var results = [];
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(crud);
        });
    */
}
