import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import AssignmentsListTable from 'view/assignments/list/AssignmentsListTable';
import AssignmentsListFilter from 'view/assignments/list/AssignmentsListFilter';
import AssignmentToolbar from 'view/assignments/list/AssignmentsListToolbar';

class AssignmentsListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.assignments.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.assignments.list.title')}
          </PageTitle>
          <AssignmentToolbar />
          <AssignmentsListFilter />
          <AssignmentsListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default AssignmentsListPage;
