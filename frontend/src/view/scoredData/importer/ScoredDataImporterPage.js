import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import importerHoc from 'view/shared/importer/Importer';
import selectors from 'modules/scoredData/importer/scoredDataImporterSelectors';
import actions from 'modules/scoredData/importer/scoredDataImporterActions';
import fields from 'modules/scoredData/importer/scoredDataImporterFields';

class ScoredDataImportPage extends Component {

  render() {
    const Importer = importerHoc(
      selectors,
      actions,
      fields,
      i18n('entities.scoredData.importer.hint'),
    );

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
                'entities.scoredData.importer.title',
              ),
            ],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n(
              'entities.scoredData.importer.title',
            )}
          </PageTitle>

          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default ScoredDataImportPage;
