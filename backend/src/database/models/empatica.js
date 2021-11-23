const database = require('../database');
const Schema = database.Schema;

/**
 * Empatica database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const EmpaticaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: [
      {
        type: Schema.Types.ObjectId,
        ref: 'empatica',
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
