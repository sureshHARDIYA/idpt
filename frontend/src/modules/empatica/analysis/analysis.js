import EmpaticaService from '../empaticaService.js';
//import csv from 'csv-parser';
//import fs from 'fs';

export default class Analysis {

    static async reader() {
        console.log("WWWWWUUUUUUUUUUUUUUUAAAAAAAAAAAA");
        await EmpaticaService.create({ name: "WUUUUAAAHAHAHAHAHAAA"});  
        /*var results = [];
        fs.createReadStream('data.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                var dataAsString = JSON.stringify(results);
                console.log(dataAsString);
                await EmpaticaService.create(dataAsString);           
            });*/   
    }
}
