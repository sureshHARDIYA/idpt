import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import actions from 'modules/record/view/recordViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/record/view/recordViewSelectors';
import _get from 'lodash/get';
import _find from 'lodash/find';
import RecordModuleView from 'view/record/module/RecordModuleView';
import RecordModuleRoadmap from 'view/record/module/RecordModuleRoadmap';

class RecordModulePage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id, {
      module: match.params.moduleId
    }));
  }

  render() {
    const { match, record, loading } = this.props;
    const casedName = _get(record, 'host.name');
    const { moduleId: id } = match.params;
    const module = _find(_get(record, 'roadmap'), { id });

    if (module) {
      module.parent = record;
    }

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.record.menu'), '/record'],
            !!casedName && [casedName, `/record/${match.params.id}`],
            [i18n('entities.record.module.title')],
          ].filter(i => i)}
        />

        <ContentWrapper>
          <RecordModuleView
            module={module}
            loading={loading}
          />

          <RecordModuleRoadmap
            module={module}
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

export default connect(select)(RecordModulePage);
