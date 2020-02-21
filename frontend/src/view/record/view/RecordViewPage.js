import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import RecordView from 'view/record/view/RecordView';
import { i18n } from 'i18n';
import actions from 'modules/record/view/recordViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/record/view/recordViewSelectors';
import RecordViewToolbar from 'view/record/view/RecordViewToolbar';
import RecordRoadmap from 'view/record/view/RecordRoadmap';

class RecordPage extends Component {
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
            [i18n('entities.record.menu'), '/record'],
            [i18n('entities.record.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.record.view.title')}
          </PageTitle>

          <RecordViewToolbar match={this.props.match} />

          <RecordView
            loading={this.props.loading}
            record={this.props.record}
          />
          <RecordRoadmap record={this.props.record} />
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

export default connect(select)(RecordPage);
