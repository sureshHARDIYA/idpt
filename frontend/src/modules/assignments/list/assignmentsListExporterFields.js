import model from 'modules/assignments/assignmentsModel';

const { fields } = model;

export default [
  fields.id,
  fields.title,
  fields.sub_title,
  fields.createdAt,
  fields.updatedAt,
];
