const database = require('../database');
const Schema = database.Schema;

/**
 * ScoredData database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const ScoredDataSchema = new Schema(
  {
    dataType: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      min: 0,
    },
    timeStart: {
      type: String,
      required: true,
    },
    timeEnd: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
    },
    patientId: {
      type: String,
    },
    dataId: {
      type: String,
      required: true,
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
