import React, {Component} from 'react';
import Graph from "react-graph-vis";
import {graphStatusColor} from "../../shared/styles/GraphStyles";
import model from "../../../modules/cased/casedModel";

import selectors from 'modules/cased/graph/casedGraphSelectors';
import actions from "../../../modules/cased/graph/casedGraphActions";
import {connect} from 'react-redux';

const {fields} = model;

class CasedGraph extends Component {
  state = {
    casedNetwork: null
  };

  options = {
    nodes: {
      shape: "box",
      borderWidth: 2,
    },
    interaction: {hover: true},
  };

  events = {
    selectNode: (event) => {
      const nodeId = event.nodes[0];
      this.props.dispatch(actions.doFind(nodeId));
    },
    deselectNode: () => {
      this.props.dispatch(actions.doDeselect());
    },
    stabilized: () => {
      const {casedNetwork} = this.state;

      if (!!casedNetwork) {
        casedNetwork.fit();
      }
    }
  };

  getData = () => {
    const {casedRows} = this.props;

    let data = {nodes: [], edges: []};
    let yValue = 50;

    casedRows.forEach(row => {
      data.nodes.push({
        id: fields.id.forView(row.id),
        label: fields.name.forView(row.name),
        color: graphStatusColor[fields.status.forView(row.status) || 'DEFAULT'],
        x: 0,
        y: yValue -= 50,
      });
    });

    return data;
  };

  render() {
    return (
      <Graph
        graph={this.getData()}
        options={this.options}
        events={this.events}
        getNetwork={casedNetwork => {
          this.setState({casedNetwork})
        }}
      />
    );
  };
}

function select(state) {
  return {
    casedRows: selectors.selectRows(state),
  };
}

export default connect(select)(CasedGraph);
