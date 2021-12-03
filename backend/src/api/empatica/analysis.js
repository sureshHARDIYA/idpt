const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios')

reader();

function reader() {     
    var results = [];
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            var dataAsString = JSON.stringify(results);
            console.log(dataAsString);
            getRequest(dataAsString)
        });
    
}

function getRequest() {
    var query = `
        query EMPATICA_LIST(
        $filter: EmpaticaFilterInput
        $orderBy: EmpaticaOrderByEnum
        $limit: Int
        $offset: Int
        ) {
        empaticaList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
        ) {
            count
            rows {
            id
            name
            updatedAt
            createdAt
            }
        }
        }
    `

    axios({
        url: 'http://localhost:8080/api',
        method: 'get',
        headers: {
            "content-type": "application/json",
        },
        data: {
            query: query,
        },
    }).then( (response) => {
        console.log(response.data['data']['empaticaList']);
    }).catch(function (error) {
        console.error('Error ' + error.message)
    });
}

function postRequest(CSVresults) {
    var nameVar = "Dette er navnet";
    var query = `mutation EMPATICA_CREATE($data: EmpaticaInput!) {
        empaticaCreate(data: $data) {
            id
        }
    }`

    axios({
        url: 'http://localhost:8080/api',
        method: 'post',
        headers: {
            "content-type": "application/json",
        },
        data: {
            query: query,
            variables: { 
                data: {
                    name: CSVresults
                  }
            }
        },
    }).then( (response) => {
        console.log(response.data['data']['empaticaList']);
    }).catch(function (error) {
        console.error('Error ' + error.message)
    });
}
