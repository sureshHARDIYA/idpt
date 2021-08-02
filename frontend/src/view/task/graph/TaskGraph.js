import React, {Component} from 'react';
import Graph from "react-graph-vis";
import {graphStatusColor} from "../../shared/styles/GraphStyles";
import Spinner from "../../shared/Spinner";
import model from "../../../modules/task/taskModel";

import selectors from 'modules/task/graph/taskGraphSelectors';
import actions from "../../../modules/task/graph/taskGraphActions";
import {connect} from 'react-redux';

const {fields} = model;

class TaskGraph extends Component {
  state = {
    taskNetwork: null
  };

  options = {
    nodes: {
      shape: "box",
      borderWidth: 2,
    },
    edges: {width: 1},
    interaction: {hover: true},
    physics: {enabled: false},
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
        taskNetwork.fit();
      }
    }
  };

  getData = () => {
    const {taskRows} = this.props;

    let data = {nodes: [], edges: []};
    let counters = {edgeId: 0, xValue: -200, yValue: 50};

    taskRows.forEach(row => {
      const rowId = fields.id.forView(row.id);
      const completionRequired = fields.completionRequired.forView(row.completionRequired);

      data.nodes.push({
        id: rowId,
        label: fields.name.forView(row.name),
        color: graphStatusColor[fields.status.forView(row.status) || 'DEFAULT'],
        shapeProperties: completionRequired === "No" ? {borderDashes: [5, 5]} : null,
        x: counters.xValue = (counters.xValue + 200) % 600,
        y: counters.yValue -= 50,
      });

      const nextTask = fields.next.forView(row.next);
      nextTask.forEach(next =>
        data.edges.push({
          id: 'taskEdge' + counters.edgeId++,
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
    const {loading, hasRows} = this.props;

    if (loading || !hasRows) {
      return <Spinner/>;
    }

    return this.renderGraph();
  };
}

function select(state) {
  return {
    loading: selectors.selectLoadingRows(state),
    taskRows: selectors.selectRows(state),
    hasRows: selectors.selectHasRows(state),
  };
}

export default connect(select)(TaskGraph);
