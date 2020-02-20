import model from 'modules/patient/patientModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.birthdate,
  fields.gender,
  fields.assignCase,
  fields.phone,
  fields.createdAt,
  fields.updatedAt
];
