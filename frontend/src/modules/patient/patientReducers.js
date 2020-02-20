import list from 'modules/patient/list/patientListReducers';
import form from 'modules/patient/form/patientFormReducers';
import view from 'modules/patient/view/patientViewReducers';
import destroy from 'modules/patient/destroy/patientDestroyReducers';
import importerReducer from 'modules/patient/importer/patientImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
