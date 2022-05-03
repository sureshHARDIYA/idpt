import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import WearableDataImporter from 'view/shared/wearableDataImporter/wearableDataImporter';

class WearableDataImportPage extends Component {
  
  
  render() {
    console.log(this.props.location);
    const Importer = WearableDataImporter();
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [
              i18n('entities.scoredData.menu'),
              '/scoredData',
            ],
            [
              i18n(
                'entities.scoredData.wearableDataImporter.title',
              ),
            ],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n(
              'entities.scoredData.wearableDataImporter.title',
            )}
          </PageTitle>

          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default WearableDataImportPage;
