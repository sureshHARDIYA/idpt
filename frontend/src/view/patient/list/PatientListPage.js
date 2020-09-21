import React, { Component } from 'react';
import { i18n } from 'i18n';

import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import PatientListTable from 'view/patient/list/PatientListTable';
import PatientToolbar from 'view/patient/list/PatientToolbar';
import PatientListFilter from 'view/patient/list/PatientListFilter';

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
          <PatientToolbar />
          <PatientListFilter />
          <PatientListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default PatientListPage;
