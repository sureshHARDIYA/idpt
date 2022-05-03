import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/scoredData/importer/scoredDataImporterSelectors';
import ScoredDataService from 'modules/scoredData/scoredDataService';
import fields from 'modules/scoredData/importer/scoredDataImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'BIOANALYZED_IMPORTER',
  selectors,
  ScoredDataService.import,
  fields,
  i18n('entities.scoredData.importer.fileName'),
);
