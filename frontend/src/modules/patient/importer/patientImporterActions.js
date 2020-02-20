import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/patient/importer/patientImporterSelectors';
import PatientService from 'modules/patient/patientService';
import fields from 'modules/patient/importer/patientImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'PATIENT_IMPORTER',
  selectors,
  PatientService.import,
  fields,
  i18n('entities.patient.importer.fileName'),
);
