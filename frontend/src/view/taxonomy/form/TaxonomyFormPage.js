import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import Breadcrumb from 'view/shared/Breadcrumb';
import TaxonomyForm from 'view/taxonomy/form/TaxonomyForm';
import { i18n } from 'i18n';
import { getHistory } from 'modules/store';
import actions from 'modules/taxonomy/form/taxonomyFormActions';
import selectors from 'modules/taxonomy/form/taxonomyFormSelectors';
import { connect } from 'react-redux';

class TaxonomyFormPage extends Component {
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
      ? i18n('entities.taxonomy.edit.title')
      : i18n('entities.taxonomy.new.title');
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.taxonomy.menu'), '/taxonomy'],
            [this.title()],
          ]}
        />

        <ContentWrapper>
          {this.state.dispatched && (
            <TaxonomyForm
              saveLoading={this.props.saveLoading}
              findLoading={this.props.findLoading}
              record={this.props.record}
              isEditing={this.isEditing()}
              onSubmit={this.doSubmit}
              onCancel={() => getHistory().push('/taxonomy')}
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

export default connect(select)(TaxonomyFormPage);
