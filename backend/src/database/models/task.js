const database = require('../database');
const Schema = database.Schema;

/**
 * Task database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const TaskSchema = new Schema(
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
      enum: [
        "ACTIVE",
        "INACTIVE",
        "DRAFT",
        null
      ],
    },
    tags: {
      type: String,
    },
    points: {
      type: Number,
      min: 0,
    },
    completionRequired: {
      type: Boolean,
      default: false
    },
    complexityLevel: {
      type: Number,
      min: 0,
    },
    type: {
      type: String,
      enum: [
        "AUDIO",
        "VIDEO",
        "TEXT",
        "ASSESSMENT",
        "FEEDBACK",
        null
      ],
    },
    owner: [{
      type: Schema.Types.ObjectId,
      ref: 'module',
    }],
    elements: [{
      type: Schema.Types.ObjectId,
      ref: 'document',
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

TaskSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

TaskSchema.set('toJSON', {
  getters: true,
});

TaskSchema.set('toObject', {
  getters: true,
});

const Task = database.model('task', TaskSchema);

module.exports = Task;
