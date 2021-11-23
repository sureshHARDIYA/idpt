import React, { Component } from 'react';
import TaskListFilter from 'view/task/list/TaskListFilter';
import TaskListTable from 'view/task/list/TaskListTable';
import TaskListToolbar from 'view/task/list/TaskListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class TaskListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.task.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.task.list.title')}
          </PageTitle>

          <TaskListToolbar />
          <TaskListFilter />
          <TaskListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default TaskListPage;
