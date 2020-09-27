import React, { Component } from 'react';
import { i18n } from 'i18n';
import { getHistory } from 'modules/store';
import actions from 'modules/assignments/form/assignmentsFormActions';
import selectors from 'modules/assignments/form/assignmentsFormSelectors';
import { connect } from 'react-redux';
import EditSurveyForm from 'view/assignments/form/components/EditSurveyForm';
import { withRouter } from 'react-router-dom';

class EditSurveyPage extends Component {
  state = {
    dispatched: false,
  };

  componentDidMount() {
    const { dispatch, match } = this.props;

    if (this.isEditing()) {
      dispatch(actions.doFind(match.params.id));
    } else {
      dispatch(actions.doNew());
    }

    this.setState({ dispatched: true });
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
      ? i18n('entities.task.edit.title')
      : i18n('entities.task.new.title');
  };

  render() {
    return (
      <React.Fragment>
        {
          <EditSurveyForm
            saveLoading={this.props.saveLoading}
            findLoading={this.props.findLoading}
            record={this.props.record}
            isEditing={this.isEditing()}
            onSubmit={this.doSubmit}
            onCancel={() =>
              getHistory().push('/assignments')
            }
          />
        }
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

export default withRouter(connect(select)(EditSurveyPage));
