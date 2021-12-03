"use strict";

var csv = require('csv-parser');

var fs = require('fs');

var axios = require('axios');

reader();

function reader() {
  var results = [];
  fs.createReadStream('data.csv').pipe(csv()).on('data', function (data) {
    return results.push(data);
  }).on('end', function () {
    var dataAsString = JSON.stringify(results);
    console.log(dataAsString);
    getRequest(dataAsString);
  });
}

function getRequest() {
  var query = "\n        query EMPATICA_LIST(\n        $filter: EmpaticaFilterInput\n        $orderBy: EmpaticaOrderByEnum\n        $limit: Int\n        $offset: Int\n        ) {\n        empaticaList(\n            filter: $filter\n            orderBy: $orderBy\n            limit: $limit\n            offset: $offset\n        ) {\n            count\n            rows {\n            id\n            name\n            updatedAt\n            createdAt\n            }\n        }\n        }\n    ";
  axios({
    url: 'http://localhost:8080/api',
    method: 'get',
    headers: {
      "content-type": "application/json"
    },
    data: {
      query: query
    }
  }).then(function (response) {
    console.log(response.data['data']['empaticaList']);
  })["catch"](function (error) {
    console.error('Error ' + error.message);
  });
}

function postRequest(CSVresults) {
  var nameVar = "Dette er navnet";
  var query = "mutation EMPATICA_CREATE($data: EmpaticaInput!) {\n        empaticaCreate(data: $data) {\n            id\n        }\n    }";
  axios({
    url: 'http://localhost:8080/api',
    method: 'post',
    headers: {
      "content-type": "application/json"
    },
    data: {
      query: query,
      variables: {
        data: {
          name: CSVresults
        }
      }
    }
  }).then(function (response) {
    console.log(response.data['data']['empaticaList']);
  })["catch"](function (error) {
    console.error('Error ' + error.message);
  });
}