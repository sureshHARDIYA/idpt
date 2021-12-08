import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import EmpaticaService from 'modules/empatica/empaticaService';

class EmpaticaImportPage extends Component {

  handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')

    EmpaticaService.create({ name: JSON.stringify(data)});
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
      addRemoveButton
      removeButtonColor='#659cef'
      onRemoveFile={this.handleOnRemoveFile}
      config={{ delimiter: "\r",
                newline:   ","}}
    >
      <span>Drop CSV file here or click to upload.</span>
    </CSVReader>);
  }
}

export default EmpaticaImportPage;
