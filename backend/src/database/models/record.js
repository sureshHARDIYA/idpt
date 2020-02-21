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

const RoadmapTaskSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: 'task',
  },
  state: stateEntry,
  completionRequired: {
    type: Boolean,
    default: false,
  },
  children: []
}, {
  timestamps: true
});

const RoadmapModuleSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: 'module',
  },
  state: stateEntry,
  completionRequired: {
    type: Boolean,
    default: false,
  },
  children: [RoadmapTaskSchema]
}, {
  timestamps: true
});

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
    roadmap: [RoadmapModuleSchema],
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

RecordSchema.methods.reloadStates = function () {
  const states = this.roadmap.map((item) => item.stat);

  if (this.state === 'LOCKED' && states.includes('ACTIVATE')) {
    this.state = 'ACTIVATE';
  }

  if (this.state === 'ACTIVATE' && states.includes('PROGRESS')) {
    this.state = 'PROGRESS';
  }

  if (!states.find(item => item !== 'COMPLETE')) {
    this.state = 'COMPLETE';
  }
}

RecordSchema.pre('save', function(next) {
  try {
    this.reloadStates();
  } catch (e) {
    console.log('RecordSchema Erorr:', e.toString());
  } finally {
    next();
  }
});

RoadmapTaskSchema.pre('save', async function(next) {
  try {
    if (this.state === 'ACTIVATE') {
      this.parent().reloadStates();
    }
  } catch (e) {
    console.log('RoadmapTaskSchema Erorr:', e.toString());
  } finally {
    next();
  }
});

/**
 * Handle state of task when it's complete
 */

// RoadmapTaskSchema.post('save', async function(doc) {
//   const parent = this.parent();

//   if (doc.state === 'COMPLETE' && parent.state !== 'COMPLETE') {
//     const task = await Task.findById(doc.host).populate('next');

//     if (task.next) {
//       for (const item of task.next) {
//         if (item.state === '')
//         console.log('item:', item);
//         // item.state =
//       }
//       task.next.state = 'ACTIVATE';

//       console.log('task.next:', task.next);
//     }
//   }
// })

RoadmapModuleSchema.methods.reloadStates = function () {
  const states = this.children.map((item) => item.state);

  if (this.state === 'LOCKED' && states.includes('ACTIVATE')) {
    this.state = 'ACTIVATE';
  }

  if (this.state === 'ACTIVATE' && states.includes('PROGRESS')) {
    this.state = 'PROGRESS';
  }

  if (!states.find(item => item !== 'COMPLETE')) {
    this.state = 'COMPLETE';
  }
}

RoadmapModuleSchema.pre('save', function(next) {
  try {
    this.reloadStates();
  } catch (e) {
    console.log('RoadmapModuleSchema Erorr:', e.toString());
  } finally {
    next();
  }
});

const Record = database.model('record', RecordSchema);

module.exports = Record;
