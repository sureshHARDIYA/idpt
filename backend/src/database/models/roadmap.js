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
    prerequisite: {
      type: Schema.Types.Mixed,
    },
    states: {
      type: Schema.Types.Mixed,
    },
    next: [{
      type: Schema.Types.ObjectId,
      ref: 'roadmap',
    }],
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

RoadmapSchema.pre('save', function(next) {
  const states = Object.values(this.states || {});
  const prerequisite = Object.values(this.prerequisite || {});

  if (this.state === 'LOCKED' && prerequisite.length > 0 && !prerequisite.find((item) => item !== 'COMPLETE')) {
    this.state = 'ACTIVATE';
  } else if (states.length > 0 && states.length === this.children.length && !states.find((item) => item !== 'COMPLETE')) {
    this.state = 'COMPLETE';
  }

  if (states.length > 0 && states.length === this.children.length) {
    if (this.state !== 'PROGRESS' && states.includes('PROGRESS')) {
      this.state = 'PROGRESS';
    } else if (this.state !== 'ACTIVATE' && states.includes('ACTIVATE')) {
      this.state = 'ACTIVATE';
    } else if (this.state !== 'COMPLETE' && !states.find((item) => item !== 'COMPLETE')) {
      this.state = 'COMPLETE';
    }
  }

  this.stateModified = this.isModified('state');
  next();
})

RoadmapSchema.post('save', async function() {
  if (this.stateModified) {
    const { next, record } = await this.populate('next').populate('record').execPopulate();

    if (record) {
      record.states = record.states || {};
      record.states[this._id] = this.state;
      await record.save();
    }

    for (const item of next) {
      item.prerequisite = item.prerequisite || {};
      item.prerequisite[this._id] = this.state;
      await item.save();
    }
  }
})

module.exports = database.model('roadmap', RoadmapSchema);
