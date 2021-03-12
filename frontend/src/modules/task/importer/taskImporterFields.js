import model from 'modules/task/taskModel';

const { fields } = model;

export default [
  fields.name,
  fields.description,
  fields.status,
  fields.owner,
  fields.tags,
  fields.points,
  fields.completionRequired,
  fields.complexityLevel,
];
