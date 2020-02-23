import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import VideoView from 'view/video/view/VideoView';
import { i18n } from 'i18n';
import actions from 'modules/video/view/videoViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/video/view/videoViewSelectors';
import VideoViewToolbar from 'view/video/view/VideoViewToolbar';

class VideoPage extends Component {
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
            [i18n('entities.video.menu'), '/video'],
            [i18n('entities.video.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.video.view.title')}
          </PageTitle>

          <VideoViewToolbar match={this.props.match} />

          <VideoView
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

export default connect(select)(VideoPage);
