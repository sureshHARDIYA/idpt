import list from 'modules/record/list/recordListReducers';
import form from 'modules/record/form/recordFormReducers';
import view from 'modules/record/view/recordViewReducers';
import destroy from 'modules/record/destroy/recordDestroyReducers';
import importerReducer from 'modules/record/importer/recordImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
