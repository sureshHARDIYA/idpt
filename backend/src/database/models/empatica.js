const database = require('../database');
const Schema = database.Schema;

/**
 * Empatica database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const EmpaticaSchema = new Schema(
  {
    type: {
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
    patient: {
      type: String,
    },
    data: [
      {
        type: String,
      },
    ],
  }
);

EmpaticaSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Empatica = database.model(
  'empatica',
  EmpaticaSchema,
);

module.exports = Empatica;
