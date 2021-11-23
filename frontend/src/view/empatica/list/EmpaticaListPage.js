import React, { Component } from 'react';
import EmpaticaListFilter from 'view/empatica/list/EmpaticaListFilter';
import EmpaticaListTable from 'view/empatica/list/EmpaticaListTable';
import EmpaticaListToolbar from 'view/empatica/list/EmpaticaListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class EmpaticaListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.empatica.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.empatica.list.title')}
          </PageTitle>

          <EmpaticaListToolbar />
          <EmpaticaListFilter />
          <EmpaticaListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default EmpaticaListPage;
