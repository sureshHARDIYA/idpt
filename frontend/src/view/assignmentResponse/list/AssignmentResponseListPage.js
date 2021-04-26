import React, { Component } from 'react'
import { i18n } from 'i18n'
import Breadcrumb from 'view/shared/Breadcrumb'
import PageTitle from 'view/shared/styles/PageTitle'
import ContentWrapper from 'view/layout/styles/ContentWrapper'
import AssignmentResponseListTable from 'view/assignmentResponse/list/AssignmentResponseListTable'

class AssignmentResponseListPage extends Component {
  render () {
    return (
      <React.Fragment>
        <Breadcrumb
          items={
            [
              [ i18n('home.menu'), '/' ],
              [ i18n('entities.assignmentResponse.menu') ]
            ]
          }
        />
        <ContentWrapper>
          <PageTitle>
            {i18n('entities.assignmentResponse.list.title')}
          </PageTitle>
          <AssignmentResponseListTable />
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

export default AssignmentResponseListPage
