import list from 'modules/task/list/taskListReducers';
import graph from 'modules/task/graph/taskGraphReducers';
import form from 'modules/task/form/taskFormReducers';
import view from 'modules/task/view/taskViewReducers';
import destroy from 'modules/task/destroy/taskDestroyReducers';
import importerReducer from 'modules/task/importer/taskImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  graph,
  form,
  view,
  destroy,
  importer: importerReducer,
});
