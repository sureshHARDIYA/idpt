import React, { Component } from 'react';
import HomeLineChart from '../../home/HomeLineChart';

export default () => {
    class BioGraph extends Component {

        render() {
            return (
                <React.Fragment>
                    <HomeLineChart></HomeLineChart>
                </React.Fragment>
            );
        }
    }
    return BioGraph;
};
