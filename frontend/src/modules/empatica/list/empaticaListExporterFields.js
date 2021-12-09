import model from 'modules/empatica/empaticaModel';

const { fields } = model;

export default [
  fields.id,
  fields.type,
  fields.frequency,
  fields.timestamp,
  fields.patient,
  fields.data,
  fields.createdAt,
  fields.updatedAt
];
