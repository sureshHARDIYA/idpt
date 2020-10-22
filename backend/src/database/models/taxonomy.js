const database = require('../database');
const Schema = database.Schema;

/**
 * Taxonomy database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const TaxonomySchema = new Schema(
  {
    parent: [
      {
        type: Schema.Types.ObjectId,
        // ref: 'taxonomy',
      },
    ],
  }
);

TaxonomySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Taxonomy = database.model(
  'taxonomy',
  TaxonomySchema,
);

module.exports = Taxonomy;
