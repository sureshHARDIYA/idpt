import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/empatica/importer/empaticaImporterSelectors';
import EmpaticaService from 'modules/empatica/empaticaService';
import fields from 'modules/empatica/importer/empaticaImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'EMPATICA_IMPORTER',
  selectors,
  EmpaticaService.import,
  fields,
  i18n('entities.empatica.importer.fileName'),
);
