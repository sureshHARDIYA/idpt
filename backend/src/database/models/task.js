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
    owner: [{
      type: Schema.Types.ObjectId,
      ref: 'module',
    }],
    next: [{
      type: Schema.Types.ObjectId,
      ref: 'task',
    }],
    audios: [new Schema({
      url: {
        type: String,
        required: true
      },
      evaluation: {
        type: Number,
        required: true
      },
    })],
    videos: [new Schema({
      url: {
        type: String,
        required: true
      },
      evaluation: {
        type: Number,
        required: true
      },
    })],
    documents: [new Schema({
      contentHTML: {
        type: String,
        required: true
      },
      evaluation: {
        type: Number,
        required: true
      },
    })],
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
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  },
);

TaskSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

TaskSchema.virtual('elements').get(function() {
  return [
    ...this.audios,
    ...this.videos,
    ...this.documents,
  ]
});

module.exports = database.model('task', TaskSchema);;
