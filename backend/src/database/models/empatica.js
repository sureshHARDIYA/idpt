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
      type: Number,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    data: [
      {
        type: String,
        required: true,
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
