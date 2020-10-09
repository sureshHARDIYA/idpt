import React, { Component } from 'react';
import { i18n } from 'i18n';
import { connect } from 'react-redux';
import Breadcrumb from 'view/shared/Breadcrumb';
import PageTitle from 'view/shared/styles/PageTitle';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import actions from 'modules/assignments/form/assignmentsFormActions';
import selectors from 'modules/assignments/form/assignmentsFormSelectors';

import FormBuilder from './builder/Render';

class AssignmentFormPage extends Component {
  state = {
    dispatched: false,
    questions: [],
  };

  async componentDidMount() {
    const { dispatch, match } = this.props;

    if (this.isEditing()) {
      await dispatch(actions.doFind(match.params.id));
    } else {
      dispatch(actions.doNew());
    }

    this.setState({
      dispatched: true,
      questions: this.props.record ? this.props.record.questions : [],
    });
  }

  doSubmit = (id, data) => {
    const { dispatch } = this.props;
    if (this.isEditing()) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  isEditing = () => {
    const { match } = this.props;
    return !!match.params.id;
  };

  title = () => {
    return this.isEditing()
      ? i18n('entities.audio.edit.title')
      : i18n('entities.audio.new.title');
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.audio.menu'), '/audio'],
            [this.title()],
          ]}
        />
        <ContentWrapper>
          <PageTitle>{this.title()}</PageTitle>
          <FormBuilder onSubmit={this.doSubmit} />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(AssignmentFormPage);
