import React, { Component } from 'react';
import HomeLineChart from '../../home/HomeLineChart';
import BioAnalyzedService from 'modules/bioAnalyzed/bioAnalyzedService';
import { Line } from 'react-chartjs-2';

export default (userId) => {
    class BioGraph extends Component {
        
        constructor(props) {
            super(props);
            this.state = {
                data: null,
            };
            this.createGraph(userId);
        }
        
        render() {
            if (this.state.data){
                return <Line data={this.state.data}/>
            }
            else {
                return <Line data={{}}/>
            }
        }
        
        async getDataFromPatient(id){
            const filter = {patientId: id}
            var data = await BioAnalyzedService.list(filter);
            data = data.rows; 
            
            const x = [];
            const y = [];
            for (let i=0; i<data.length; i++){
                x.push(data[i].timeStart + "\n" + data[i].timeEnd);
                y.push(data[i].score);
            } 
            
            return [x, y];
        }
        
        async createGraph(userId){
            const result = await this.getDataFromPatient(userId);
            const x = result[0]
            const y = result[1]
            
            console.log(x, y);
            
            const data = {
                labels: x,
                datasets: [
                    {
                        label: "Stress score over time",
                        data: y,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)"
                    },
                ]
            };
            
            this.setState({ 
                data: data
              });
        } 
    }
    
    
    
    return BioGraph;
};
