import selectors from 'modules/module/graph/moduleGraphSelectors';
import destroySelectors from 'modules/module/destroy/moduleDestroySelectors';
import casedSelectors from 'modules/module/moduleSelectors';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Graph from "react-graph-vis";
import actions from "../../../modules/module/graph/moduleGraphActions";

class ModuleGraph extends Component {
  state = {
    moduleNetwork: {}
  };

  options = {
    autoResize: true,
    height: "500px",
    nodes: {shape: "box"},
    edges: {
      color: "#000000",
      width: 1,
    },
    interaction: {hover: true},
    physics: {
      enabled: true, // This must be false to use manual positioning for nodes
      stabilization: { // Force the graph to stabilize before being shown
        enabled: true,
        iterations: 5000
      }
    },
  };

  events = {
    selectNode: (event) => {
      const currentId = event.nodes[0];
      const currentNode = this.setSelectedNode(currentId);
      this.props.dispatch(actions.doChangeSelected(currentNode));
    },
    stabilized: () => {
      this.state.moduleNetwork.setOptions({physics: {enabled: false}});
      this.state.moduleNetwork.fit();
    }
  };

  setSelectedNode(currentId) {
    const {moduleRows} = this.props;
    return moduleRows.find(node => node.id === currentId);
  };

  getNodes = () => {
    const {moduleRows, casedRecord} = this.props;
    if (!moduleRows.length) {
      return [];
    }

    // Re-label the 'name'-property to 'label', to fit the requirements of the Graph-framefork
    let nodes = moduleRows.map(row => {
        const {name: label, ...rest} = row;
        return {label, ...rest};
      }
    );

    // Filter: Get the modules that correspond to the casedRecord
    if (!!casedRecord) {
      nodes = nodes.filter(n => casedRecord.modules.map(m => m.id).includes(n.id));
    }

    // Add coordinates to each row, to prettify the graph-result
    let xValue = -100;
    let yValue = -100;
    nodes.forEach(e => {
      e.x = (xValue += 100) % 300;
      e.y = yValue += 100;
    });

    this.getEdges();
    return nodes;
  };


  getEdges = () => {
    const {moduleRows} = this.props;
    if (!moduleRows.length) {
      return []
    }

    let edgeId = 0;
    let edges = [];
    moduleRows.forEach(m => {
        if (!!m.prerequisite.length) {
          let prereq = m.prerequisite.map(p => p.id)
          prereq.forEach(p => edges.push({id: edgeId++, from: p, to: m.id}))

        }
      }
    )

    return edges;
  };

  render() {
    return (
      <Graph
        graph={{
          nodes: this.getNodes(),
          edges: this.getEdges()
        }}
        options={this.options}
        events={this.events}
        getNetwork={moduleNetwork => {
          this.setState({moduleNetwork})
        }}
      />
    );
  };
}

function select(state) {
  return {
    loading: selectors.selectLoading(state) || destroySelectors.selectLoading(state),
    moduleRows: selectors.selectRows(state),
    moduleRecord: selectors.selectRecord(state),
    hasPermissionToEdit: casedSelectors.selectPermissionToEdit(state,),
    hasPermissionToDestroy: casedSelectors.selectPermissionToDestroy(state,),
    hasPermissionToRead: casedSelectors.selectPermissionToRead(state,),

  };
}

export default connect(select)(ModuleGraph);
