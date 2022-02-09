const database = require('../database');
const Schema = database.Schema;

/**
 * BioData database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const BioDataSchema = new Schema(
  {
    dataType: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
    },
    patientId: {
      type: String,
    },
    data: [
      {
        type: String,
      },
    ],
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

BioDataSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const BioData = database.model(
  'bioData',
  BioDataSchema,
);

module.exports = BioData;
