import React, { Component } from 'react';
import DocumentListFilter from 'view/document/list/DocumentListFilter';
import DocumentListTable from 'view/document/list/DocumentListTable';
import DocumentListToolbar from 'view/document/list/DocumentListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class DocumentListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.document.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.document.list.title')}
          </PageTitle>

          <DocumentListToolbar />
          <DocumentListFilter />
          <DocumentListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default DocumentListPage;
