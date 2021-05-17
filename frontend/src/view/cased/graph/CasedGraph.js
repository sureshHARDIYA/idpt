import selectors from 'modules/cased/graph/casedGraphSelectors';
import destroySelectors from 'modules/cased/destroy/casedDestroySelectors';
import casedSelectors from 'modules/cased/casedSelectors';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Graph from "react-graph-vis";
import actions from "../../../modules/cased/graph/casedGraphActions";

class CasedGraph extends Component {


  options = {
    autoResize: true,
    height: "500px",
    nodes: {shape: "box"},
    interaction: {hover: true},
  };

  events = {
    selectNode: (event) => {
      const currentId = event.nodes[0];
      const currentNode = this.setSelectedNode(currentId);
      this.props.dispatch(actions.doChangeSelected(currentNode))

    },
  };

  setSelectedNode(currentId) {
    const {rows} = this.props;
    return rows.find(node => node.id === currentId);
  };

  getNodes = () => {
    const {rows} = this.props;
    if (!rows.length) {
      return []
    }

    // Re-label the 'name'-property to 'label', to fit the requirements of the Graph-framefork
    const nodes = rows.map(row => {
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
      />
    );
  };
}

function select(state) {
  return {
    loading: selectors.selectLoading(state) || destroySelectors.selectLoading(state),
    rows: selectors.selectRows(state),
    record: selectors.selectRecord(state),
    hasPermissionToEdit: casedSelectors.selectPermissionToEdit(state,),
    hasPermissionToDestroy: casedSelectors.selectPermissionToDestroy(state,),
    hasPermissionToRead: casedSelectors.selectPermissionToRead(state,),

  };
}

export default connect(select)(CasedGraph);
