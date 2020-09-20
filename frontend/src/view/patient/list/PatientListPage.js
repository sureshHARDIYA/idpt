import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import CasedListTable from 'view/patient/list/CasedListTable';

class PatientListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.patient.menu')],
          ]}
        />
        <ContentWrapper>
          <PageTitle>
            {i18n('entities.patient.list.title')}
          </PageTitle>
          <CasedListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default PatientListPage;
