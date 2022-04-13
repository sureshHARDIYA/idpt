const database = require('../database');
const Schema = database.Schema;

/**
 * BioAnalyzed database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const BioAnalyzedSchema = new Schema(
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
      required: true,
    },
    patientId: {
      type: String,
      required: true,
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

BioAnalyzedSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const BioAnalyzed = database.model(
  'bioAnalyzed',
  BioAnalyzedSchema,
);

module.exports = BioAnalyzed;
