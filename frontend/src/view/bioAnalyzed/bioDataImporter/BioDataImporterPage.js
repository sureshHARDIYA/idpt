import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import BioDataService from 'modules/bioData/bioDataService';

class BioDataImportPage extends Component {
  
  handleOnDrop = (data, file) => {
    const dataArray = [];
    
    for (const line of data) {
      dataArray.push(line.data[0])
    }
  
    BioDataService.create({ type: file.name.substr(0, file.name.indexOf('.')),
                             frequency: Math.round(dataArray[1]).toString(),
                             timestamp: Math.round(dataArray[0]).toString(),
                             data: dataArray.slice(2)});
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  render() {
    return (<CSVReader
      onDrop={this.handleOnDrop}
      onError={this.handleOnError}
      addRemoveButton={true}
      removeButtonColor='#659cef'
      onRemoveFile={this.handleOnRemoveFile}
    >
      <span>Drop CSV file here or click to upload.</span>
    </CSVReader>);
  }
}

export default BioDataImportPage;
