import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/module/importer/moduleImporterSelectors';
import ModuleService from 'modules/module/moduleService';
import fields from 'modules/module/importer/moduleImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'MODULE_IMPORTER',
  selectors,
  ModuleService.import,
  fields,
  i18n('entities.module.importer.fileName'),
);
