import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/audio/importer/audioImporterSelectors';
import AudioService from 'modules/audio/audioService';
import fields from 'modules/audio/importer/audioImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'AUDIO_IMPORTER',
  selectors,
  AudioService.import,
  fields,
  i18n('entities.audio.importer.fileName'),
);
