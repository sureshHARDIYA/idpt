const database = require('../database');
const Schema = database.Schema;

/**
 * Roadmap database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */

const RoadmapSchema = new Schema(
  {
    record: {
      type: Schema.Types.ObjectId,
      ref: 'record',
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: 'module',
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

RoadmapSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

RoadmapSchema.set('toJSON', {
  getters: true,
});

RoadmapSchema.set('toObject', {
  getters: true,
});

module.exports = database.model('roadmap', RoadmapSchema);
