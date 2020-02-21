import model from 'modules/record/recordModel';

const { fields } = model;

export default [
  fields.name,
  fields.description,
  fields.status,
  fields.tags,
  fields.points,
  fields.completionRequired,
  fields.complexityLevel,
  fields.type,
  fields.owner,
  fields.elements,
];
