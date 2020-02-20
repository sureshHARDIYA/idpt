import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/document/importer/documentImporterSelectors';
import DocumentService from 'modules/document/documentService';
import fields from 'modules/document/importer/documentImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'DOCUMENT_IMPORTER',
  selectors,
  DocumentService.import,
  fields,
  i18n('entities.document.importer.fileName'),
);
