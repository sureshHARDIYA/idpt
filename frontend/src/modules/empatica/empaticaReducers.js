import list from 'modules/empatica/list/empaticaListReducers';
import form from 'modules/empatica/form/empaticaFormReducers';
import view from 'modules/empatica/view/empaticaViewReducers';
import destroy from 'modules/empatica/destroy/empaticaDestroyReducers';
import importerReducer from 'modules/empatica/importer/empaticaImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
