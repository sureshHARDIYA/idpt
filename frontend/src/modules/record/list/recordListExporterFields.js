import model from 'modules/record/recordModel';

const { fields } = model;

export default [
  fields.id,
  fields.description,
  fields.status,
  fields.owner,
  fields.host,
  fields.createdAt,
  fields.updatedAt
];
