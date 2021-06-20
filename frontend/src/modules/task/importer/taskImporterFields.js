import model from 'modules/task/taskModel';

const { fields } = model;

export default [
  fields.name,
  fields.description,
  fields.status,
  fields.owner,
  fields.taxonomies,
  fields.tags,
  fields.points,
  fields.completionRequired,
  fields.complexityLevel,
  fields.prerequisite,
];
