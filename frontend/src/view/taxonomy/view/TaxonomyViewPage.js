import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import TaxonomyView from 'view/taxonomy/view/TaxonomyView';
import { i18n } from 'i18n';
import actions from 'modules/taxonomy/view/taxonomyViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/taxonomy/view/taxonomyViewSelectors';
import TaxonomyViewToolbar from 'view/taxonomy/view/TaxonomyViewToolbar';

class TaxonomyPage extends Component {
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
            [i18n('entities.taxonomy.menu'), '/taxonomy'],
            [i18n('entities.taxonomy.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.taxonomy.view.title')}
          </PageTitle>

          <TaxonomyViewToolbar match={this.props.match} />

          <TaxonomyView
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

export default connect(select)(TaxonomyPage);
