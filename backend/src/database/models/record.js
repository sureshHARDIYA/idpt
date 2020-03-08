const database = require('../database');
const Schema = database.Schema;

// const Task = database.model('task')

const stateEntry = {
  type: String,
  enum: [
    "LOCKED",
    "ACTIVATE",
    "PROGRESS",
    "COMPLETE"
  ],
  default: 'LOCKED',
}

/**
 * Record database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const RecordSchema = new Schema(
  {
    host: {
      type: Schema.Types.ObjectId,
      ref: 'cased',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'patient',
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "ACTIVE",
        "INACTIVE",
        "DRAFT",
      ],
      default: 'ACTIVE',
    },
    state: stateEntry,
    roadmaps: [{
      type: Schema.Types.ObjectId,
      ref: 'roadmap',
    }],
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

RecordSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

RecordSchema.set('toJSON', {
  getters: true,
});

RecordSchema.set('toObject', {
  getters: true,
});

module.exports = database.model('record', RecordSchema);;
