import selectors from 'modules/module/graph/moduleGraphSelectors';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Graph from "react-graph-vis";
import actions from "../../../modules/module/graph/moduleGraphActions";
import Spinner from "../../shared/Spinner";

class ModuleGraph extends Component {
  state = {
    moduleNetwork: null
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
      this.props.dispatch(actions.doChangeSelected(nodeId));
    },
    deselectNode: () => {
      this.props.dispatch(actions.doDeselect());
    },
    stabilized: () => {
      const {moduleNetwork} = this.state;

      if (!!moduleNetwork) {
        moduleNetwork.setOptions({physics: {enabled: false}});
        moduleNetwork.fit();
      }
    }
  };

  getNodes = () => {
    const {moduleRows, hasRows} = this.props;
    if (!hasRows) {
      return []
    }

    // Re-label the 'name'-property to 'label', to fit the requirements of the Graph-framefork
    let nodes = moduleRows.map(row => {
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
    const {moduleRows, hasRows} = this.props;
    if (!hasRows) {
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

  renderGraph() {
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
    moduleRows: selectors.selectRows(state),
    hasRows: selectors.selectHasRows(state)
  };
}

export default connect(select)(ModuleGraph);
