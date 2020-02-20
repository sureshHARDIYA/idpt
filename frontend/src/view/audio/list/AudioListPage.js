import React, { Component } from 'react';
import AudioListFilter from 'view/audio/list/AudioListFilter';
import AudioListTable from 'view/audio/list/AudioListTable';
import AudioListToolbar from 'view/audio/list/AudioListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class AudioListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.audio.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.audio.list.title')}
          </PageTitle>

          <AudioListToolbar />
          <AudioListFilter />
          <AudioListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default AudioListPage;
