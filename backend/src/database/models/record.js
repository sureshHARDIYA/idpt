const database = require('../database');
const Schema = database.Schema;

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
    states: {
      type: Schema.Types.Mixed,
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

RecordSchema.pre('save', function(next) {
  const states = Object.values(this.states || {});

  if (states.length > 0) {
    if (states.includes('PROGRESS')) {
      this.state = 'PROGRESS';
    } else if (states.includes('ACTIVATE')) {
      this.state = 'ACTIVATE';
    } else if (!states.find((item) => item !== 'COMPLETE')) {
      this.state = 'COMPLETE';
    }
  }

  next();
})

module.exports = database.model('record', RecordSchema);;
