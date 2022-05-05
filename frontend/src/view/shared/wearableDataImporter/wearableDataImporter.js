import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import WearableDataService from 'modules/wearableData/wearableDataService';
import DataFhirConverter from 'modules/scoredData/dataFhirConverter'; 

export default () => {
    class WearableDataImporter extends Component {
        constructor(props) {
            super(props);
            this.state = {
                EDA_uploaded: false,
                EDA_data: {},
                TEMP_uploaded: false,
                TEMP_data: {},
            };
        }
        
        render() {
            return (
                <React.Fragment>
                    <CSVReader
                    onDrop={this.handleOnDrop}
                    onError={this.handleOnError}
                    addRemoveButton={true}
                    removeButtonColor='#659cef'
                    onRemoveFile={this.handleOnRemoveFile}
                    >
                        <span>Drop EDA.csv file here or click to upload.</span>
                    </CSVReader>
                    <h1></h1>
                    <CSVReader
                    onDrop={this.handleOnDrop}
                    onError={this.handleOnError}
                    addRemoveButton={true}
                    removeButtonColor='#659cef'
                    onRemoveFile={this.handleOnRemoveFile}
                    >
                        <span>Drop TEMP.csv file here or click to upload.</span>
                    </CSVReader>
                </React.Fragment>
                
            );
        }

        handleOnDrop = (csv_data, file) => {
            const dataArray = [];
            
            for (const line of csv_data) {
                dataArray.push(line.data[0])
            }

            var data_type = file.name.substr(0, file.name.indexOf('.'));
            
            var data = { dataType: data_type,
            frequency: Math.round(dataArray[1]).toString(),
            timestamp: Math.round(dataArray[0]).toString(),
            data: dataArray.slice(2)}

            this.validCheck(data);
        }

        validCheck(data) {
            var data_type = data.dataType;
            
            if (data_type == "EDA"){
                this.setState({
                    EDA_uploaded: true,
                    EDA_data: data
                });
            }

            if (data_type == "TEMP"){
                this.setState({
                    TEMP_uploaded: true,
                    TEMP_data: data
                });
            }

            if (this.state.EDA_uploaded && this.state.TEMP_uploaded){
                if (this.state.EDA_data.timestamp == this.state.TEMP_data.timestamp){
                    var datas = [];
                    datas.push(DataFhirConverter.wearableDataToFhir(this.state.EDA_data));
                    datas.push(DataFhirConverter.wearableDataToFhir(this.state.TEMP_data));
                    console.log(datas);
                    WearableDataService.create({datas: datas});
                }
            }
        }

        handleOnError = (err, file, inputElem, reason) => {
            console.log(err);
        }

        handleOnRemoveFile = (data) => {
            console.log('-------- Removed ----------');
            console.log(data);
            console.log('---------------------------');
        }
    }
    return WearableDataImporter;
};
