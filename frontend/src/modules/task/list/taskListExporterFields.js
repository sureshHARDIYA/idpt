import model from 'modules/task/taskModel';

const { fields } = model;

export default [
  fields.id,
  fields.name,
  fields.description,
  fields.status,
  fields.tags,
  fields.points,
  fields.completionRequired,
  fields.complexityLevel,
  fields.owner,
  fields.taxonomies,
  fields.createdAt,
  fields.updatedAt,
];
