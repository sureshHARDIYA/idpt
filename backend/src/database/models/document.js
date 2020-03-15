const database = require('../database');
const Schema = database.Schema;

/**
 * Document database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const DocumentSchema = new Schema(
  {
    contentHTML: {
      type: String,
    },
    totalreadtime: {
      type: Number,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    importHash: { type: String },
    evaluationCriteria: {
      field: String,
      operator: String,
      valueRequired: String,
    }
  },
  { timestamps: true },
);

DocumentSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

DocumentSchema.set('toJSON', {
  getters: true,
});

DocumentSchema.set('toObject', {
  getters: true,
});

const Document = database.model('document', DocumentSchema);

module.exports = Document;
