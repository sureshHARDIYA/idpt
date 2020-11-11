import model from 'modules/taxonomy/taxonomyModel';

const { fields } = model;

export default [
  fields.id,
  fields.status,
  fields.parent,
  fields.createdAt,
  fields.updatedAt
];
