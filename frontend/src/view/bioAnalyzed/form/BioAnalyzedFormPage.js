import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import Breadcrumb from 'view/shared/Breadcrumb';
import BioAnalyzedForm from 'view/bioAnalyzed/form/BioAnalyzedForm';
import { i18n } from 'i18n';
import { getHistory } from 'modules/store';
import actions from 'modules/bioAnalyzed/form/bioAnalyzedFormActions';
import selectors from 'modules/bioAnalyzed/form/bioAnalyzedFormSelectors';
import { connect } from 'react-redux';

class BioAnalyzedFormPage extends Component {
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
      ? i18n('entities.bioAnalyzed.edit.title')
      : i18n('entities.bioAnalyzed.new.title');
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.bioAnalyzed.menu'), '/bioAnalyzed'],
            [this.title()],
          ]}
        />

        <ContentWrapper>
          {this.state.dispatched && (
            <BioAnalyzedForm
              saveLoading={this.props.saveLoading}
              findLoading={this.props.findLoading}
              record={this.props.record}
              isEditing={this.isEditing()}
              onSubmit={this.doSubmit}
              onCancel={() => getHistory().push('/bioAnalyzed')}
            />
          )}
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

export default connect(select)(BioAnalyzedFormPage);
