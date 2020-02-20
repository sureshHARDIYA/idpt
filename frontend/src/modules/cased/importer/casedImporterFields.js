import model from 'modules/cased/casedModel';

const { fields } = model;

export default [
  fields.name,
  fields.description,
  fields.status,
  fields.featuredImage,
  fields.modules,
  fields.patients,
  fields.availableFrom,
];
