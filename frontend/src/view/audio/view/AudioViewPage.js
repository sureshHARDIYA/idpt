import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import AudioView from 'view/audio/view/AudioView';
import { i18n } from 'i18n';
import actions from 'modules/audio/view/audioViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/audio/view/audioViewSelectors';
import AudioViewToolbar from 'view/audio/view/AudioViewToolbar';

class AudioPage extends Component {
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
            [i18n('entities.audio.menu'), '/audio'],
            [i18n('entities.audio.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.audio.view.title')}
          </PageTitle>

          <AudioViewToolbar match={this.props.match} />

          <AudioView
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

export default connect(select)(AudioPage);
