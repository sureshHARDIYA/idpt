import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import EmpaticaService from 'modules/empatica/empaticaService';

class EmpaticaImportPage extends Component {

  handleOnDrop = (data) => {
    const dataArray = [];
  
    for (const line of data) {
      dataArray.push(line.data[0])
    }

    //EmpaticaService.create({ name: JSON.stringify(dataArray)});
    EmpaticaService.create({ type: "EDA",
                            frequency: 4,
                            timestamp: 745256456,
                            patient: { user: "hei" },
                            data: ["1", "2" , "3"]});
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
    >
      <span>Drop CSV file here or click to upload.</span>
    </CSVReader>);
  }
}

export default EmpaticaImportPage;
