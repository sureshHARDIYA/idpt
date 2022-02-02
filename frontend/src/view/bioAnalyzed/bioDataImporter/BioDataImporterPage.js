import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import BioDataImporter from 'view/shared/bioDataImporter/bioDataImporter';

class BioDataImportPage extends Component {
  
  render() {
    const Importer = BioDataImporter();
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [
              i18n('entities.bioAnalyzed.menu'),
              '/bioAnalyzed',
            ],
            [
              i18n(
                'entities.bioAnalyzed.bioDataImporter.title',
              ),
            ],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n(
              'entities.bioAnalyzed.bioDataImporter.title',
            )}
          </PageTitle>

          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default BioDataImportPage;
