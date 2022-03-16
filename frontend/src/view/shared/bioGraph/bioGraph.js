import React, { Component } from 'react';
import BioAnalyzedService from 'modules/bioAnalyzed/bioAnalyzedService';
import { Line } from 'react-chartjs-2';

export default (userId) => {
    class BioGraph extends Component {
        
        constructor(props) {
            super(props);
            this.state = {
                data: null,
                options: {
                    scales: {
                      xAxes: [
                        {
                          display: false,
                        },
                        {
                            ticks: {
                                callback: function(value, index, values) {
                                    // Display only date of startTime on the x-axis
                                    var tempLabel = value.split(' ');
                                    return tempLabel[0];
                                }
                            }
                        }
                      ],
                    },
                }
            };
            this.createGraph(userId);
        }
        
        render() {

            if (this.state.data){
                return <Line options={this.state.options} data={this.state.data}/>
            }
            else {
                return <Line data={{}}/>
            }
        }
        
        async getDataFromPatient(id){
            const filter = {patientId: id}
            var data = await BioAnalyzedService.list(filter);
            data = data.rows;

            data.sort((a, b) => {  
                if(a['timeStart'] > b['timeStart'])  
                   return 1;
                if(a['timeStart'] < b['timeStart'])  
                   return -1;
                return 0;  
            });
            
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
