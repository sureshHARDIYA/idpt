import React, { Component } from 'react';
import TaxonomyListFilter from 'view/taxonomy/list/TaxonomyListFilter';
import TaxonomyListTable from 'view/taxonomy/list/TaxonomyListTable';
import TaxonomyListToolbar from 'view/taxonomy/list/TaxonomyListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class TaxonomyListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.taxonomy.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.taxonomy.list.title')}
          </PageTitle>

          <TaxonomyListToolbar />
          <TaxonomyListFilter />
          <TaxonomyListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default TaxonomyListPage;
