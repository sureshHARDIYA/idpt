import list from 'modules/bioAnalyzed/list/bioAnalyzedListReducers';
import form from 'modules/bioAnalyzed/form/bioAnalyzedFormReducers';
import view from 'modules/bioAnalyzed/view/bioAnalyzedViewReducers';
import destroy from 'modules/bioAnalyzed/destroy/bioAnalyzedDestroyReducers';
import importerReducer from 'modules/bioAnalyzed/importer/bioAnalyzedImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
