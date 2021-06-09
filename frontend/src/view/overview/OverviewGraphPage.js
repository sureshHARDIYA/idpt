import React, {Component} from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';

import casedGraphSelectors from "../../modules/cased/graph/casedGraphSelectors";
import CasedGraphPage from "../cased/graph/CasedGraphPage";
import casedActions from "../../modules/cased/graph/casedGraphActions";

import moduleGraphSelectors from "../../modules/module/graph/moduleGraphSelectors";
import ModuleGraphPage from "../module/graph/ModuleGraphPage";
import moduleActions from "../../modules/module/graph/moduleGraphActions";
import {connect} from "react-redux";

import TaskGraphPage from "../task/graph/TaskGraphPage";
import {Collapse} from "antd";

class OverviewGraphPage extends Component {
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(casedActions.doDeselect());
    dispatch(moduleActions.doDeselect());
  }

  text = `
  Select a node by clicking on said node, and deselect by clicking on the graph background.
  
  A node selection activates the corresponding element-information on the right, and the corresponding subgraph below.
  
  Nodes can be dragged around to enhance the view experience.
  `;

  render() {
    const {casedRecord, moduleRecord} = this.props
    const {Panel} = Collapse;

    return (
      <React.Fragment>
        <ContentWrapper>
          <PageTitle>
            Overview
          </PageTitle>

          <Collapse>
            <Panel header="Instructions for the overview graphs" key={1}>
              {this.text}
            </Panel>
          </Collapse>

          <CasedGraphPage/>
          <ModuleGraphPage casedRecord={casedRecord}/>
          <TaskGraphPage
            casedRecord={casedRecord}
            moduleRecord={moduleRecord}
          />
        </ContentWrapper>

        <button onClick={() => {this.forceUpdate();}}>Force render</button> {/*TODO: Remove line when done. Used to manually trigger render*/}
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    casedRecord: casedGraphSelectors.selectRecord(state),
    moduleRecord: moduleGraphSelectors.selectRecord(state),
  };
}

export default connect(select)(OverviewGraphPage);