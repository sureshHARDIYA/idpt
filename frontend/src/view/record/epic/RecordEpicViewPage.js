import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import { connect } from 'react-redux';
import actions from 'modules/epic/view/epicViewActions';
import selectors from 'modules/epic/view/epicViewSelectors';
import _get from 'lodash/get';
import RecordEpicView from 'view/record/epic/RecordEpicView';
import BoxWrapper from 'view/shared/styles/BoxWrapper';

class RecordEpicPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    const { epic, loading } = this.props;
    const moduleName = _get(epic, 'roadmap.host.name');
    const casedName = _get(epic, 'roadmap.record.host.name');

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.record.menu'), '/record'],
            !!casedName && [casedName, `/record/${_get(epic, 'roadmap.record.id')}`],
            !!moduleName && [moduleName, `/roadmaps/${_get(epic, 'roadmap.id')}`],
            [i18n('entities.record.task.title')],
          ].filter(i => i)}
        />
        <ContentWrapper>
          <RecordEpicView
            epic={epic}
            loading={loading}
          />
          <p>
            Show all element and content of task in below
          </p>
          <BoxWrapper>
            Text: put content
          </BoxWrapper>
          <BoxWrapper>
            Audio: put content
          </BoxWrapper>
          <BoxWrapper>
            Video: put content
          </BoxWrapper>
          <BoxWrapper>
            Activity: put content
          </BoxWrapper>
          <BoxWrapper>
            Assignment: put content
          </BoxWrapper>
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

const select = (state) => ({
  epic: selectors.selectRecord(state),
  loading: selectors.selectLoading(state),
})

export default connect(select)(RecordEpicPage);
