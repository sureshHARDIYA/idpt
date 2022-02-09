import React, { Component } from 'react';
import HomeLineChart from '../../home/HomeLineChart';
import BioAnalyzedService from 'modules/bioAnalyzed/bioAnalyzedService';

export default (userId) => {
    class BioGraph extends Component {

        render() {
            console.log(this.getDataFromPatient(userId));
            return (
                <React.Fragment>
                    <HomeLineChart></HomeLineChart>
                </React.Fragment>
            );
        }

        async getDataFromPatient(id){
            const filter = {
                score: null,
                timeEnd: null,
                timeStart: null,
                dataType: null,
                patientName: null,
                patientId: id}
            console.log(await BioAnalyzedService.list(filter,
                null,
                null,
                null));
            return ""
        }
    }

    

    return BioGraph;
};
