import React, {Component} from 'react';
import Graph from "react-graph-vis";
import {graphStatusColor} from "../../shared/styles/GraphStyles";
import Spinner from "../../shared/Spinner";
import model from "../../../modules/task/taskModel";

import selectors from 'modules/task/graph/taskGraphSelectors';
import actions from "../../../modules/task/graph/taskGraphActions";
import {connect} from 'react-redux';

const { fields } = model;

class TaskGraph extends Component {
  state = {
    taskNetwork: null
  };

  options = {
    autoResize: true,
    height: "100%",
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
      const nodeId = event.nodes[0];
      this.props.dispatch(actions.doFind(nodeId))
    },
    deselectNode: () => {
      this.props.dispatch(actions.doDeselect());
    },
    stabilized: () => {
      const {taskNetwork} = this.state;

      if (!!taskNetwork) {
        taskNetwork.setOptions({physics: {enabled: false}});
        taskNetwork.fit();
      }
    }
  };

  getData = () => {
    const {taskRows} = this.props;

    let data = {nodes: [], edges: []};
    let counters = {edgeId: 0, xValue: -100, yValue: -100};

    taskRows.forEach(row => {
      const rowId = fields.id.forView(row.id);

      data.nodes.push({
        id: rowId,
        label: fields.name.forView(row.name),
        color: graphStatusColor[fields.status.forView(row.status) || 'DEFAULT'],
        x: (counters.xValue += 100) % 300,
        y: counters.yValue += 100,
      });

      const nextTask = fields.next.forView(row.next);
      nextTask.forEach(next =>
        data.edges.push({
          id: counters.edgeId++,
          from: rowId,
          to: fields.id.forView(next.id)
        })
      );
    });

    return data;
  };

  renderGraph() {
    return (
      <Graph
        graph={this.getData()}
        options={this.options}
        events={this.events}
        getNetwork={taskNetwork => {
          this.setState({taskNetwork})
        }}
      />
    );
  };

  render() {
    const {loading} = this.props;

    if (loading) {
      return <Spinner/>;
    }

    return this.renderGraph();
  };
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    taskRows: selectors.selectRows(state),
  };
}

export default connect(select)(TaskGraph);
