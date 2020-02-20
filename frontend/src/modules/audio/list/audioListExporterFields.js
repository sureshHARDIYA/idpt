import model from 'modules/audio/audioModel';

const { fields } = model;

export default [
  fields.id,
  fields.url,
  fields.audiolength,
  fields.createdAt,
  fields.updatedAt
];
