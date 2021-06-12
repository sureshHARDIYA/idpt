import selectors from 'modules/cased/graph/casedGraphSelectors';
import destroySelectors from 'modules/cased/destroy/casedDestroySelectors';
import casedSelectors from 'modules/cased/casedSelectors';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Graph from "react-graph-vis";
import actions from "../../../modules/cased/graph/casedGraphActions";

class CasedGraph extends Component {
  state = {
    casedNetwork: null
  };

  options = {
    autoResize: true,
    height: "500px",
    nodes: {shape: "box"},
    interaction: {hover: true},
  };

  events = {
    selectNode: (event) => {
      const nodeId = event.nodes[0];
      this.props.dispatch(actions.doChangeSelected(nodeId));
    },
    deselectNode: () => {
      this.props.dispatch(actions.doDeselect());
    },
    stabilized: () => {
      const {casedNetwork} = this.state;

      if (!!casedNetwork) {
        casedNetwork.setOptions({physics: {enabled: false}});
        casedNetwork.fit();
      }
    }
  };

  getNodes = () => {
    const {casedRows} = this.props;
    if (!casedRows.length) {
      return []
    }

    // Re-label the 'name'-property to 'label', to fit the requirements of the Graph-framefork
    const nodes = casedRows.map(row => {
        const {name: label, ...rest} = row;
        return {label, ...rest};
      }
    );

    // Add coordinates to each row, to prettify the graph-result
    let yValue = -50;
    nodes.forEach(e => {
      e.x = 0;
      e.y = yValue += 50
    })

    return nodes;
  };

  render() {
    return (
      <Graph
        graph={{
          nodes: this.getNodes(),
          edges: []
        }}
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
    loading: selectors.selectLoading(state) || destroySelectors.selectLoading(state),
    casedRows: selectors.selectRows(state),
    casedRecord: selectors.selectRecord(state),
    hasPermissionToEdit: casedSelectors.selectPermissionToEdit(state,),
    hasPermissionToDestroy: casedSelectors.selectPermissionToDestroy(state,),
    hasPermissionToRead: casedSelectors.selectPermissionToRead(state,),

  };
}

export default connect(select)(CasedGraph);
