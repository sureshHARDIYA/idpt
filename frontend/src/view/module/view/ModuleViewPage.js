import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import ModuleView from 'view/module/view/ModuleView';
import { i18n } from 'i18n';
import actions from 'modules/module/view/moduleViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/module/view/moduleViewSelectors';
import ModuleViewToolbar from 'view/module/view/ModuleViewToolbar';

class ModulePage extends Component {
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
            [i18n('entities.module.menu'), '/module'],
            [i18n('entities.module.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.module.view.title')}
          </PageTitle>

          <ModuleViewToolbar match={this.props.match} />

          <ModuleView
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

export default connect(select)(ModulePage);
