import model from 'modules/empatica/empaticaModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.owner,
  fields.createdAt,
  fields.updatedAt,
];
