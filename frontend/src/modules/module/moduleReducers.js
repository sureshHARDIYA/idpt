import list from 'modules/module/list/moduleListReducers';
import form from 'modules/module/form/moduleFormReducers';
import view from 'modules/module/view/moduleViewReducers';
import graph from 'modules/module/graph/moduleGraphReducers';
import destroy from 'modules/module/destroy/moduleDestroyReducers';
import importerReducer from 'modules/module/importer/moduleImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  graph,
  form,
  view,
  destroy,
  importer: importerReducer,
});
