import React, { Component } from 'react';
import CasedListFilter from 'view/cased/list/CasedListFilter';
import CasedListTable from 'view/cased/list/CasedListTable';
import CasedListToolbar from 'view/cased/list/CasedListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class CasedListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.cased.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.cased.list.title')}
          </PageTitle>

          <CasedListToolbar />
          <CasedListFilter />
          <CasedListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default CasedListPage;
