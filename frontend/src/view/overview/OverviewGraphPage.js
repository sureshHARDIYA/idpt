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
import {i18n} from "../../i18n";

class OverviewGraphPage extends Component {
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(casedActions.doDeselect());
    dispatch(moduleActions.doDeselect());
  }

  render() {
    const {casedRecord, moduleRecord} = this.props
    const {Panel} = Collapse;

    return (
      <React.Fragment>
        <ContentWrapper>
          <PageTitle>
            {i18n('overview.label')}
          </PageTitle>

          <Collapse>
            <Panel header={i18n('overview.instructions.header')} key={1}>
              <p>{i18n('overview.instructions.select')}</p>
              <p>{i18n('overview.instructions.activate')}</p>
              <p>{i18n('overview.instructions.drag')}</p>
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