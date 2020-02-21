import React, { Component } from 'react';
import RecordListFilter from 'view/record/list/RecordListFilter';
import RecordListTable from 'view/record/list/RecordListTable';
import RecordListToolbar from 'view/record/list/RecordListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class RecordListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.record.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.record.list.title')}
          </PageTitle>

          <RecordListToolbar />
          <RecordListFilter />
          <RecordListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default RecordListPage;
