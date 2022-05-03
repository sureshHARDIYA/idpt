import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import ScoredDataView from 'view/scoredData/view/ScoredDataView';
import { i18n } from 'i18n';
import actions from 'modules/scoredData/view/scoredDataViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/scoredData/view/scoredDataViewSelectors';
import ScoredDataViewToolbar from 'view/scoredData/view/ScoredDataViewToolbar';

class ScoredDataPage extends Component {
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
            [i18n('entities.scoredData.menu'), '/scoredData'],
            [i18n('entities.scoredData.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.scoredData.view.title')}
          </PageTitle>

          <ScoredDataViewToolbar match={this.props.match} />

          <ScoredDataView
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

export default connect(select)(ScoredDataPage);
