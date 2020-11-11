import list from 'modules/taxonomy/list/taxonomyListReducers';
import form from 'modules/taxonomy/form/taxonomyFormReducers';
import view from 'modules/taxonomy/view/taxonomyViewReducers';
import destroy from 'modules/taxonomy/destroy/taxonomyDestroyReducers';
import importerReducer from 'modules/taxonomy/importer/taxonomyImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
