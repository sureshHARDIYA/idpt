const database = require('../database');
const Schema = database.Schema;
const FHIR = require('./fhir');

/**
 * ScoredData database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
 const ScoredDataSchema = new Schema(
  {
    fhir: {
      type: FHIR.ObservationSchema,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  }
);

ScoredDataSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const ScoredData = database.model(
  'scoredData',
  ScoredDataSchema,
);

module.exports = ScoredData;
