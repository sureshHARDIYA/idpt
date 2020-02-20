import list from 'modules/module/list/moduleListReducers';
import form from 'modules/module/form/moduleFormReducers';
import view from 'modules/module/view/moduleViewReducers';
import destroy from 'modules/module/destroy/moduleDestroyReducers';
import importerReducer from 'modules/module/importer/moduleImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
