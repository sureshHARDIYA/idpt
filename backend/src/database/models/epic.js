const database = require('../database');
const Schema = database.Schema;
const Roadmap = require('./roadmap');

/**
 * Epic database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */

const EpicCriteriaSchema = new Schema({
  done: Boolean,
  field: String,
  total: Number,
  evaluation: Number,
  operator: String,
  content: String,
  resourceType: String,
  history: [
    {
      start: String,
      duration: Number,
    },
  ],
  resourceId: Schema.Types.ObjectId,
});

EpicCriteriaSchema.pre('save', function(next) {
  this.total = (this.history || []).reduce(
    (total, item) => total + item.duration,
    0,
  );

  if (!this.done) {
    switch (this.operator) {
      case 'LESSTHAN': {
        this.done = this.total <= this.evaluation;
        break;
      }
      case 'GREATERTHAN': {
        this.done = this.total >= this.evaluation;
        break;
      }
      case 'EQUALS': {
        this.done = this.total === this.evaluation;
        break;
      }
    }
  }

  next();
});

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
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'epic',
      },
    ],
    next: [
      {
        type: Schema.Types.ObjectId,
        ref: 'epic',
      },
    ],
    prerequisite: {
      type: Schema.Types.Mixed,
      default: {},
    },
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
    elements: [EpicCriteriaSchema],
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

EpicSchema.pre('save', function(next) {
  const state = `${this.state}`;
  const prerequisite = Object.values(
    this.prerequisite || {},
  );

  if (
    this.state === 'LOCKED' &&
    prerequisite.length > 0 &&
    !prerequisite.find((item) => item !== 'COMPLETE')
  ) {
    this.state =
      this.elements.length > 0 ? 'ACTIVATE' : 'COMPLETE';
  } else if (
    this.state === 'PROGRESS' &&
    this.state !== 'COMPLETE' &&
    this.elements.length > 0 &&
    !this.elements.find((item) => !item.done)
  ) {
    this.state = 'COMPLETE';
  }

  this.stateModified = state !== this.state;

  next();
});

EpicSchema.post('updateOne', function() {
  return this.model
    .findOne(this.getQuery())
    .then((instance) => instance.save());
});

EpicSchema.post('save', async function() {
  if (this.stateModified || !this.__v) {
    const { next, roadmap } = this;

    await Roadmap.updateOne(
      { _id: roadmap },
      { $set: { [`states.${this._id}`]: this.state } },
    );

    for (const item of next) {
      try {
        await this.model('epic').updateOne(
          { _id: item },
          {
            $set: {
              [`prerequisite.${this._id}`]: this.state,
            },
          },
        );
      } catch (e) {
        console.log('EpicSchema Save:', item, e.toString());
      }
    }
  }
});

module.exports = database.model('epic', EpicSchema);
