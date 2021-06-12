import React, {Component} from 'react';
import Graph from "react-graph-vis";

import selectors from 'modules/task/graph/taskGraphSelectors';
import actions from "../../../modules/task/graph/taskGraphActions";
import {connect} from 'react-redux';
import Spinner from "../../shared/Spinner";

class TaskGraph extends Component {
  state = {
    taskNetwork: null
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
      const nodeId = event.nodes[0];
      this.props.dispatch(actions.doChangeSelected(nodeId))
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

  getNodes = () => {
    const {taskRows, hasRows} = this.props;
    if (!hasRows) {
      return [];
    }

    // Re-label the 'name'-property to 'label', to fit the requirements of the Graph-framefork
    let nodes = taskRows.map(row => {
        const {name: label, ...rest} = row;
        return {label, ...rest};
      }
    );

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
    const {taskRows, hasRows} = this.props;
    if (!hasRows) {
      return [];
    }

    let edgeId = 0;
    let edges = [];

    taskRows.forEach(t => {
        if (!!t.next.length) {
          let next = t.next.map(n => n.id);
          next.forEach(n => edges.push({id: edgeId++, from: t.id, to: n}));
        }
      }
    );

    return edges;
  };

  renderGraph() {
    return (
      <Graph
        graph={{
          nodes: this.getNodes(),
          edges: this.getEdges()
        }}
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
    hasRows: selectors.selectHasRows(state)
  };
}

export default connect(select)(TaskGraph);
