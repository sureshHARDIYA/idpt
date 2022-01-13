import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import BioAnalyzedView from 'view/bioAnalyzed/view/BioAnalyzedView';
import { i18n } from 'i18n';
import actions from 'modules/bioAnalyzed/view/bioAnalyzedViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/bioAnalyzed/view/bioAnalyzedViewSelectors';
import BioAnalyzedViewToolbar from 'view/bioAnalyzed/view/BioAnalyzedViewToolbar';

class BioAnalyzedPage extends Component {
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
            [i18n('entities.bioAnalyzed.menu'), '/bioAnalyzed'],
            [i18n('entities.bioAnalyzed.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.bioAnalyzed.view.title')}
          </PageTitle>

          <BioAnalyzedViewToolbar match={this.props.match} />

          <BioAnalyzedView
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

export default connect(select)(BioAnalyzedPage);
