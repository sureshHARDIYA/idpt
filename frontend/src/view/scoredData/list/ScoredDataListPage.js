import React, { Component } from 'react';
import ScoredDataListFilter from 'view/scoredData/list/ScoredDataListFilter';
import ScoredDataListTable from 'view/scoredData/list/ScoredDataListTable';
import ScoredDataListToolbar from 'view/scoredData/list/ScoredDataListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class ScoredDataListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.scoredData.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.scoredData.list.title')}
          </PageTitle>

          <ScoredDataListToolbar />
          <ScoredDataListFilter />
          <ScoredDataListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default ScoredDataListPage;
