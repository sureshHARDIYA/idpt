import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/bioAnalyzed/importer/bioAnalyzedImporterSelectors';
import BioAnalyzedService from 'modules/bioAnalyzed/bioAnalyzedService';
import fields from 'modules/bioAnalyzed/importer/bioAnalyzedImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'BIOANALYZED_IMPORTER',
  selectors,
  BioAnalyzedService.import,
  fields,
  i18n('entities.bioAnalyzed.importer.fileName'),
);
