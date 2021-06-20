import React, {Component} from 'react';
import Graph from "react-graph-vis";
import {graphStatusColor} from 'view/shared/styles/GraphStyles';
import Spinner from "../../shared/Spinner";
import model from "../../../modules/module/moduleModel";

import selectors from 'modules/module/graph/moduleGraphSelectors';
import actions from "../../../modules/module/graph/moduleGraphActions";
import {connect} from 'react-redux';

const {fields} = model;

class ModuleGraph extends Component {
  state = {
    moduleNetwork: null
  };

  options = {
    nodes: {
      shape: "box",
      borderWidth: 2,
    },
    edges: {width: 1},
    interaction: {hover: true},
    physics: {
      enabled: true,
      stabilization: {
        enabled: true,
        iterations: 5000,
      }
    },
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
      const {moduleNetwork} = this.state;

      if (!!moduleNetwork) {
        moduleNetwork.setOptions({physics: {enabled: false}});
        moduleNetwork.fit();
      }
    }
  };

  getData = () => {
    const {moduleRows} = this.props;

    let data = {nodes: [], edges: []};
    let counters = {edgeId: 0, xValue: -100, yValue: -100};

    moduleRows.forEach(row => {
      const rowId = fields.id.forView(row.id);

      data.nodes.push({
        id: rowId,
        label: fields.name.forView(row.name),
        color: graphStatusColor[fields.status.forView(row.status) || 'DEFAULT'],
        x: (counters.xValue += 100) % 300,
        y: counters.yValue += 100,
      });

      const prereq = fields.prerequisite.forView(row.prerequisite);
      prereq.forEach(pre =>
        data.edges.push({
          id: counters.edgeId++,
          from: fields.id.forView(pre.id),
          to: rowId
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
        getNetwork={moduleNetwork => {
          this.setState({moduleNetwork})
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
    moduleRows: selectors.selectRows(state),
    hasRows: selectors.selectHasRows(state),
  };
}

export default connect(select)(ModuleGraph);
