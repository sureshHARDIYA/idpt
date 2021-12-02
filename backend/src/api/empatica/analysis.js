const csv = require('csv-parser');
const fs = require('fs');

reader();

function reader() {
    const results = [];
    await syncRead(results);
    console.log(results);

}

async function syncRead(results) {
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            //console.log(results);
        });
}