import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import importerHoc from 'view/shared/importer/Importer';
import selectors from 'modules/empatica/importer/empaticaImporterSelectors';
import actions from 'modules/empatica/importer/empaticaImporterActions';
import fields from 'modules/empatica/importer/empaticaImporterFields';

class EmpaticaImportPage extends Component {
  
  render() {
    const Importer = importerHoc(
      selectors,
      actions,
      fields,
      i18n('entities.empatica.importer.hint'),
    );

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [
              i18n('entities.empatica.menu'),
              '/empatica',
            ],
            [
              i18n(
                'entities.empatica.importer.title',
              ),
            ],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n(
              'entities.empatica.importer.title',
            )}
          </PageTitle>

          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default EmpaticaImportPage;
