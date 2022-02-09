import model from 'modules/bioAnalyzed/bioAnalyzedModel';

const { fields } = model;

export default [
  fields.id,
  fields.dataType,
  fields.score,
  fields.timeStart,
  fields.timeEnd,
  fields.patientName,
  fields.patientId,
  fields.dataId,
  fields.createdAt,
  fields.updatedAt
];
