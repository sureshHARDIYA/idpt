import React, { Component } from 'react';
import PatientListFilter from 'view/patient/list/PatientListFilter';
import PatientListTable from 'view/patient/list/PatientListTable';
import PatientListToolbar from 'view/patient/list/PatientListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

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

          <PatientListToolbar />
          <PatientListFilter />
          <PatientListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default PatientListPage;
