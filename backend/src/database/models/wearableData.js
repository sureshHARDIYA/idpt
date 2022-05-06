const database = require('../database');
const Schema = database.Schema;
const FHIR = require('./fhir');

/**
 * WearableData database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const WearableDataSchema = new Schema(
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

WearableDataSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const WearableData = database.model(
  'wearableData',
  WearableDataSchema,
);

module.exports = WearableData;
