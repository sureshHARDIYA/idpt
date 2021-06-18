import model from 'modules/module/moduleModel';

const { fields } = model;

export default [
  fields.owner,
  fields.name,
  fields.description,
  fields.status,
  fields.tasks,
  fields.taxonomies,
  fields.featuredImage,
  fields.prerequisite,
];
