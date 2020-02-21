import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/record/importer/recordImporterSelectors';
import RecordService from 'modules/record/recordService';
import fields from 'modules/record/importer/recordImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'RECORD_IMPORTER',
  selectors,
  RecordService.import,
  fields,
  i18n('entities.record.importer.fileName'),
);
