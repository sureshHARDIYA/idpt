const database = require('../database');
const Schema = database.Schema;
const { FileSchema } = require('./file');

/**
 * Cased database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const CasedSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['ACTIVE', 'INACTIVE', 'DRAFT'],
    },
    featuredImage: [FileSchema],
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: 'module',
      },
    ],
    taxonomies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy',
      },
    ],
    audience: {
      type: String,
      default: 'ALL',
      enum: ['ALL', 'USER'],
    },
    audienceList: [String],
    availableFrom: {
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
    importHash: { type: String },
  },
  { timestamps: true },
);

CasedSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

CasedSchema.set('toJSON', {
  getters: true,
});

CasedSchema.set('toObject', {
  getters: true,
});

const Cased = database.model('cased', CasedSchema);

module.exports = Cased;
