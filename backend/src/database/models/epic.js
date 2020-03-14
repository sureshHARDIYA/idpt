const database = require('../database');
const Schema = database.Schema;

/**
 * Epic database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */

const EpicSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'task',
    },
    roadmap: {
      type: Schema.Types.ObjectId,
      ref: 'roadmap',
    },
    children: [{
      type: Schema.Types.ObjectId,
      ref: 'epic',
    }],
    state: database.stateEntry,
    completionRequired: {
      type: Boolean,
      default: false,
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

EpicSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

EpicSchema.set('toJSON', {
  getters: true,
});

EpicSchema.set('toObject', {
  getters: true,
});

module.exports = database.model('epic', EpicSchema);
