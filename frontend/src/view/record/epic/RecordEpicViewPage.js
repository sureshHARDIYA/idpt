import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import { connect } from 'react-redux';
import actions from 'modules/epic/view/epicViewActions';
import selectors from 'modules/epic/view/epicViewSelectors';
import _get from 'lodash/get';
// import _find from 'lodash/find';
import RecordEpicView from 'view/record/epic/RecordEpicView';
import RecordEpicRoadmap from 'view/record/epic/RecordEpic';

class RecordEpicPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    const { roadmap, loading } = this.props;
    const casedName = _get(roadmap, 'record.host.name');

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.record.menu'), '/record'],
            !!casedName && [casedName, `/record/${_get(roadmap, 'record.id')}`],
            [i18n('entities.record.module.title')],
          ].filter(i => i)}
        />
        <ContentWrapper>
          <RecordEpicView
            loading={loading}
            module={roadmap}
          />

          <RecordEpicRoadmap
            module={roadmap}
          />
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

const select = (state) => ({
  roadmap: selectors.selectRecord(state),
  loading: selectors.selectLoading(state),
})

export default connect(select)(RecordEpicPage);
