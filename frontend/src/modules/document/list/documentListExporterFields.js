import model from 'modules/document/documentModel';

const { fields } = model;

export default [
  fields.id,
  fields.contentHTML,
  fields.totalreadtime,
  fields.createdAt,
  fields.updatedAt
];
