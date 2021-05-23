import React, {Component} from 'react';
import Graph from "react-graph-vis";

import selectors from 'modules/task/graph/taskGraphSelectors';
import destroySelectors from 'modules/task/destroy/taskDestroySelectors';
import taskSelectors from 'modules/task/taskSelectors';
import actions from "../../../modules/task/graph/taskGraphActions";
import {connect} from 'react-redux';

class TaskGraph extends Component {


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
      this.props.dispatch(actions.doChangeSelected(currentNode))
    },
  };

  setSelectedNode(currentId) {
    const {taskRows} = this.props;
    return taskRows.find(node => node.id === currentId);
  };

  getNodes = () => {
    const {taskRows, moduleRecord} = this.props;
    if (!taskRows.length) {
      return []
    }

    // Re-label the 'name'-property to 'label', to fit the requirements of the Graph-framefork
    let nodes = taskRows.map(row => {
        const {name: label, ...rest} = row;
        return {label, ...rest};
      }
    );

    // Filter: Get the tasks that correspond to the moduleRecord
    if (!!moduleRecord) {
      nodes = nodes.filter(n => moduleRecord.tasks.map(m => m.id).includes(n.id));
    }

    // Add coordinates to each row, to prettify the graph-result
    let xValue = -100;
    let yValue = -100;
    nodes.forEach(e => {
      e.x = xValue > 300 ? xValue = 0 : xValue += 100;
      e.y = yValue += 100
    })

    this.getEdges()
    return nodes;
  };


  getEdges = () => {
    const {taskRows} = this.props;
    if (!taskRows.length) {
      return []
    }

    let edgeId = 0;
    let edges = [];

    console.log("TASKS:" , taskRows)

    taskRows.forEach(t => {
        if (!!t.next.length) {
          let next = t.next.map(n => n.id)
          next.forEach(n => edges.push({id: edgeId++, from: t.id, to: n}))

        }
      }
    )

    return edges;
  };

  render() {
    console.log("Module: ", this.props)

    return (
      <Graph
        graph={{
          nodes: this.getNodes(),
          edges: this.getEdges()
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
    taskRows: selectors.selectRows(state),
    taskRecord: selectors.selectRecord(state),
    hasPermissionToEdit: taskSelectors.selectPermissionToEdit(state,),
    hasPermissionToDestroy: taskSelectors.selectPermissionToDestroy(state,),
    hasPermissionToRead: taskSelectors.selectPermissionToRead(state,),

  };
}

export default connect(select)(TaskGraph);
