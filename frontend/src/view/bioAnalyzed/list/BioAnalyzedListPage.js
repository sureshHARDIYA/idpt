import React, { Component } from 'react';
import BioAnalyzedListFilter from 'view/bioAnalyzed/list/BioAnalyzedListFilter';
import BioAnalyzedListTable from 'view/bioAnalyzed/list/BioAnalyzedListTable';
import BioAnalyzedListToolbar from 'view/bioAnalyzed/list/BioAnalyzedListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class BioAnalyzedListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.bioAnalyzed.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.bioAnalyzed.list.title')}
          </PageTitle>

          <BioAnalyzedListToolbar />
          <BioAnalyzedListFilter />
          <BioAnalyzedListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default BioAnalyzedListPage;
