import list from 'modules/scoredData/list/scoredDataListReducers';
import form from 'modules/scoredData/form/scoredDataFormReducers';
import view from 'modules/scoredData/view/scoredDataViewReducers';
import destroy from 'modules/scoredData/destroy/scoredDataDestroyReducers';
import importerReducer from 'modules/scoredData/importer/scoredDataImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
