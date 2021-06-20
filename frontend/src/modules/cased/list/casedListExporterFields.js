import model from 'modules/cased/casedModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.description,
  fields.status,
  fields.featuredImage,
  fields.modules,
  fields.taxonomies,
  fields.patients,
  fields.availableFrom,
  fields.createdAt,
  fields.updatedAt
];
