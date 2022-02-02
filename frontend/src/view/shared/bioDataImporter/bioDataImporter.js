import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import BioDataService from 'modules/bioData/bioDataService';

export default () => {
    class BioDataImporter extends Component {
        render() {
            return (
                <CSVReader
                onDrop={this.handleOnDrop}
                onError={this.handleOnError}
                addRemoveButton={true}
                removeButtonColor='#659cef'
                onRemoveFile={this.handleOnRemoveFile}
                >
                    <span>Drop CSV file here or click to upload.</span>
                </CSVReader>
            );
        }

        handleOnDrop = (data, file) => {
            console.log(this.props);
            return;
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
            console.log('-------- Removed ----------')
            console.log(data)
            console.log('---------------------------')
        }
    }
    return BioDataImporter;
};
