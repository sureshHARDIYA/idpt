import React, { Component } from 'react';
import ModuleListFilter from 'view/module/list/ModuleListFilter';
import ModuleListTable from 'view/module/list/ModuleListTable';
import ModuleListToolbar from 'view/module/list/ModuleListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class ModuleListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.module.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.module.list.title')}
          </PageTitle>

          <ModuleListToolbar />
          <ModuleListFilter />
          <ModuleListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default ModuleListPage;
