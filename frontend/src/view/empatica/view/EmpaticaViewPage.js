import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import EmpaticaView from 'view/empatica/view/EmpaticaView';
import { i18n } from 'i18n';
import actions from 'modules/empatica/view/empaticaViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/empatica/view/empaticaViewSelectors';
import EmpaticaViewToolbar from 'view/empatica/view/EmpaticaViewToolbar';

class EmpaticaPage extends Component {
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
            [i18n('entities.empatica.menu'), '/empatica'],
            [i18n('entities.empatica.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.empatica.view.title')}
          </PageTitle>

          <EmpaticaViewToolbar match={this.props.match} />

          <EmpaticaView
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

export default connect(select)(EmpaticaPage);
