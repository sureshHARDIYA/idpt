import React, {Component} from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import {connect} from "react-redux";

import casedGraphSelectors from "../../modules/cased/graph/casedGraphSelectors";
import CasedGraphPage from "../cased/graph/CasedGraphPage";

import moduleGraphSelectors from "../../modules/module/graph/moduleGraphSelectors";
import ModuleGraphPage from "../module/graph/ModuleGraphPage";

import TaskGraphPage from "../task/graph/TaskGraphPage";

class OverviewGraphPage extends Component {

  render() {
    return (
      <React.Fragment>
        <ContentWrapper>
          <PageTitle>
            Overview
          </PageTitle>

          <CasedGraphPage/>
          <ModuleGraphPage casedRecord={this.props.casedRecord}/>
          <TaskGraphPage moduleRecord={this.props.moduleRecord}/>
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