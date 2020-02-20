import list from 'modules/cased/list/casedListReducers';
import form from 'modules/cased/form/casedFormReducers';
import view from 'modules/cased/view/casedViewReducers';
import destroy from 'modules/cased/destroy/casedDestroyReducers';
import importerReducer from 'modules/cased/importer/casedImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
