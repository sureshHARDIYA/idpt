import model from 'modules/patient/patientModel';

const { fields } = model;

export default [
  fields.name,
  fields.birthdate,
  fields.gender,
  fields.assignCase,
  fields.phone,
];
