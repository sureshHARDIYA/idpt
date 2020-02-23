import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import importerHoc from 'view/shared/importer/Importer';
import selectors from 'modules/video/importer/videoImporterSelectors';
import actions from 'modules/video/importer/videoImporterActions';
import fields from 'modules/video/importer/videoImporterFields';

class VideoImportPage extends Component {
  render() {
    const Importer = importerHoc(
      selectors,
      actions,
      fields,
      i18n('entities.video.importer.hint'),
    );

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [
              i18n('entities.video.menu'),
              '/video',
            ],
            [
              i18n(
                'entities.video.importer.title',
              ),
            ],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n(
              'entities.video.importer.title',
            )}
          </PageTitle>

          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default VideoImportPage;
