import { combineReducers } from 'redux'
import list from 'modules/video/list/videoListReducers'
import form from 'modules/video/form/videoFormReducers'
import view from 'modules/video/view/videoViewReducers'
import destroy from 'modules/video/destroy/videoDestroyReducers'
import importerReducer from 'modules/video/importer/videoImporterReducers'

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer
})
