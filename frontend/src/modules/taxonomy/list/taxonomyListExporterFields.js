import model from 'modules/taxonomy/taxonomyModel';

const { fields } = model;

export default [
  fields.id,
  // fields.status,
  fields.name,
  fields.parent,
  fields.children,
  fields.createdAt,
  fields.updatedAt
];
