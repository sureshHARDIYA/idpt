import React, {Component} from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';

import CasedGraphPage from "../cased/graph/CasedGraphPage";
import casedActions from "../../modules/cased/graph/casedGraphActions";
import ModuleGraphPage from "../module/graph/ModuleGraphPage";
import moduleActions from "../../modules/module/graph/moduleGraphActions";
import TaskGraphPage from "../task/graph/TaskGraphPage";
import taskActions from "../../modules/task/graph/taskGraphActions";

import {Collapse} from "antd";
import {i18n} from "../../i18n";

class OverviewGraphPage extends Component {
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(casedActions.doDeselect());
    dispatch(moduleActions.doDeselect());
    dispatch(taskActions.doDeselect());
  }

  render() {
    const {Panel} = Collapse;

    return (
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
        <ModuleGraphPage/>
        <TaskGraphPage/>

        <button onClick={() => {this.forceUpdate();}}>Force render</button> {/*TODO: Remove line when done. Used to manually trigger render*/}
      </ContentWrapper>
    );
  }
}

export default OverviewGraphPage;