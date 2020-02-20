import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import DocumentView from 'view/document/view/DocumentView';
import { i18n } from 'i18n';
import actions from 'modules/document/view/documentViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/document/view/documentViewSelectors';
import DocumentViewToolbar from 'view/document/view/DocumentViewToolbar';

class DocumentPage extends Component {
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
            [i18n('entities.document.menu'), '/document'],
            [i18n('entities.document.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.document.view.title')}
          </PageTitle>

          <DocumentViewToolbar match={this.props.match} />

          <DocumentView
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

export default connect(select)(DocumentPage);
