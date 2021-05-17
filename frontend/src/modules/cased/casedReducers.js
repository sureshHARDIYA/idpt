import list from 'modules/cased/list/casedListReducers';
import form from 'modules/cased/form/casedFormReducers';
import view from 'modules/cased/view/casedViewReducers';
import graph from 'modules/cased/graph/casedGraphReducers';
import destroy from 'modules/cased/destroy/casedDestroyReducers';
import importerReducer from 'modules/cased/importer/casedImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  graph,
  form,
  view,
  destroy,
  importer: importerReducer,
});
