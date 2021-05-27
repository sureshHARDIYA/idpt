import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import actions from 'modules/task/view/taskViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/task/view/taskViewSelectors';
import TaskViewContent from "./TaskViewContent";

class TaskPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.task.menu'), '/task'],
            [i18n('entities.task.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.task.view.title')}
          </PageTitle>

          <TaskViewContent
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(TaskPage);
