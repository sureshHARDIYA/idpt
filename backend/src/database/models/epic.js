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
  total: String,
  operator: String,
  valueRequired: String,
  history: [{
    start: String,
    duration: Number
  }],
  id: Schema.Types.ObjectId,
})

EpicCriteriaSchema.pre('save', function(next) {
  this.total = (this.history || []).reduce((total, item) => total + item.duration, 0);

  if (!this.done) {
    switch(this.operator) {
      case 'LESSTHAN': {
        this.done = this.total <= parseInt(this.valueRequired, 10);
        break;
      }
      case 'GREATERTHAN': {
        this.done = this.total >= parseInt(this.valueRequired, 10);
        break;
      }
      case 'EQUALS': {
        this.done = this.total === parseInt(this.valueRequired, 10);
        break;
      }
    }
  }

  next();
})

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
    next: [{
      type: Schema.Types.ObjectId,
      ref: 'epic',
    }],
    prerequisite: {
      type: Schema.Types.Mixed,
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
  const prerequisite = Object.values(this.prerequisite || {});

  if (
    this.state === 'LOCKED' &&
    prerequisite.length > 0 &&
    !prerequisite.find((item) => item !== 'COMPLETE')
  ) {
    this.state = 'ACTIVATE';
  } else if (
    this.state === 'PROGRESS' &&
    this.state !== 'COMPLETE' &&
    this.elements.length > 0 &&
    !this.elements.find((item) => !item.done)
  ) {
    this.state = 'COMPLETE';
  }

  this.stateModified = this.isModified('state');
  next();
})

EpicSchema.post('save', async function() {
  if (this.stateModified || !this.__v) {
    const { next, roadmap } = await this.populate('next').populate('roadmap').execPopulate();

    await Roadmap.updateOne(
      { _id: roadmap._id },
      { $set: { [`states.${this._id}`]: this.state } }
    )
    await roadmap.save();

    for (const item of next) {
      await this.model('epic').updateOne(
        { _id: item._id },
        { $set: { [`prerequisite.${this._id}`]: this.state } }
      )
      await item.save();
    }
  }
})

module.exports = database.model('epic', EpicSchema);
