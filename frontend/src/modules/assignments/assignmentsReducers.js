// import list from 'modules/document/list/documentListReducers';
import form from 'modules/assignments/form/assignmentsFormReducers';
// import view from 'modules/document/view/documentViewReducers';
// import destroy from 'modules/document/destroy/documentDestroyReducers';
// import importerReducer from 'modules/document/importer/documentImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  // list,
  form,
  // view,
  // destroy,
  // importer: importerReducer,
});
