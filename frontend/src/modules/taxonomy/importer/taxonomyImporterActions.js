import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/taxonomy/importer/taxonomyImporterSelectors';
import TaxonomyService from 'modules/taxonomy/taxonomyService';
import fields from 'modules/taxonomy/importer/taxonomyImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'TAXONOMY_IMPORTER',
  selectors,
  TaxonomyService.import,
  fields,
  i18n('entities.taxonomy.importer.fileName'),
);
