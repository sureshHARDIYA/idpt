import importerActions from 'modules/shared/importer/importerActions'
import selectors from 'modules/video/importer/videoImporterSelectors'
import VideoService from 'modules/video/videoService'
import fields from 'modules/video/importer/videoImporterFields'
import { i18n } from 'i18n'

export default importerActions(
  'VIDEO_IMPORTER',
  selectors,
  VideoService.import,
  fields,
  i18n('entities.video.importer.fileName')
)
