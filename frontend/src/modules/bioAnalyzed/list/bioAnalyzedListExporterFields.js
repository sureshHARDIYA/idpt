import model from 'modules/bioAnalyzed/bioAnalyzedModel';

const { fields } = model;

export default [
  fields.id,
  fields.type,
  fields.score,
  fields.timeStart,
  fields.timeEnd,
  fields.patient,
  fields.dataId,
  fields.createdAt,
  fields.updatedAt
];
