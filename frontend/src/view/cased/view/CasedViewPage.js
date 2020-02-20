import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import CasedView from 'view/cased/view/CasedView';
import { i18n } from 'i18n';
import actions from 'modules/cased/view/casedViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/cased/view/casedViewSelectors';
import CasedViewToolbar from 'view/cased/view/CasedViewToolbar';

class CasedPage extends Component {
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
            [i18n('entities.cased.menu'), '/cased'],
            [i18n('entities.cased.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.cased.view.title')}
          </PageTitle>

          <CasedViewToolbar match={this.props.match} />

          <CasedView
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

export default connect(select)(CasedPage);
