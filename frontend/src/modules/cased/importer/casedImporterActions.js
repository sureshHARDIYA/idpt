import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/cased/importer/casedImporterSelectors';
import CasedService from 'modules/cased/casedService';
import fields from 'modules/cased/importer/casedImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'CASED_IMPORTER',
  selectors,
  CasedService.import,
  fields,
  i18n('entities.cased.importer.fileName'),
);
