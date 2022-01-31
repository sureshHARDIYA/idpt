import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import importerHoc from 'view/shared/importer/Importer';
import selectors from 'modules/bioAnalyzed/importer/bioAnalyzedImporterSelectors';
import actions from 'modules/bioAnalyzed/importer/bioAnalyzedImporterActions';
import fields from 'modules/bioAnalyzed/importer/bioAnalyzedImporterFields';

class BioAnalyzedImportPage extends Component {

  render() {
    const Importer = importerHoc(
      selectors,
      actions,
      fields,
      i18n('entities.bioAnalyzed.importer.hint'),
    );

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
                'entities.bioAnalyzed.importer.title',
              ),
            ],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n(
              'entities.bioAnalyzed.importer.title',
            )}
          </PageTitle>

          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default BioAnalyzedImportPage;
