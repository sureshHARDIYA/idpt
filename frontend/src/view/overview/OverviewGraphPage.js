import React, {Component} from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';

import CasedGraphPage from "../cased/graph/CasedGraphPage";
import ModuleGraphPage from "../module/graph/ModuleGraphPage";
import TaskGraphPage from "../task/graph/TaskGraphPage";

import {Collapse} from "antd";
import {i18n} from "../../i18n";

class OverviewGraphPage extends Component {

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
      </ContentWrapper>
    );
  }
}

export default OverviewGraphPage;