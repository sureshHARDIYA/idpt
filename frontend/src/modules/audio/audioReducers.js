import list from 'modules/audio/list/audioListReducers';
import form from 'modules/audio/form/audioFormReducers';
import view from 'modules/audio/view/audioViewReducers';
import destroy from 'modules/audio/destroy/audioDestroyReducers';
import importerReducer from 'modules/audio/importer/audioImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
