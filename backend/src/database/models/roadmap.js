const database = require('../database')
const Schema = database.Schema
const Record = require('./record')

/**
 * Roadmap database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const RoadmapSchema = new Schema(
  {
    record: { type: Schema.Types.ObjectId, ref: 'record' },
    module: { type: Schema.Types.ObjectId, ref: 'module' },
    children: [ { type: Schema.Types.ObjectId, ref: 'epic' } ],
    state: database.stateEntry,
    completionRequired: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    prerequisite: { type: Schema.Types.Mixed, default: {} },
    states: { type: Schema.Types.Mixed, default: {} },
    next: [ { type: Schema.Types.ObjectId, ref: 'roadmap' } ],
    importHash: { type: String }
  },
  { timestamps: true }
)

RoadmapSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

RoadmapSchema.set('toJSON', { getters: true })

RoadmapSchema.set('toObject', { getters: true })

// RoadmapSchema.pre('save', function(next) {
//   const states = Object.values(this.states || {});
//   const prerequisite = Object.values(this.prerequisite || {});
//   const state = `${this.state}`;
//
//   if (states.length > 0 && states.length === this.children.length) {
//     if (
//       this.state === 'ACTIVATE' &&
//       this.state !== 'PROGRESS' &&
//       states.includes('PROGRESS')
//     ) {
//       this.state = 'PROGRESS';
//     } else if (
//       this.state === 'LOCKED' &&
//       this.state !== 'ACTIVATE' &&
//       states.includes('ACTIVATE')
//     ) {
//       this.state = 'ACTIVATE';
//     }
//   }
//
//   if (
//     this.state === 'LOCKED' &&
//     prerequisite.length > 0 &&
//     !prerequisite.find((item) => item !== 'COMPLETE')
//   ) {
//     this.state = 'ACTIVATE';
//   } else if (this.state === 'PROGRESS' && states.length === this.children.length && !states.find((item) => item !== 'COMPLETE')) {
//     this.state = 'COMPLETE';
//   }
//
//   this.stateModified = state !== this.state;
//   next();
// })
RoadmapSchema.post('updateOne', async function () {
  await this.model.findOne(this.getQuery()).then(instance => instance.save())
})

// RoadmapSchema.post('save', async function() {
//   if (this.stateModified || !this.__v) {
//     const { next, record, children } = await this.populate('next').populate('children').execPopulate();
//
//     if (this.state === 'ACTIVATE' && children.length > 0 && !children.find((item) => item.state !== 'LOCKED')) {
//       children[0].state = 'ACTIVATE';
//       await children[0].save();
//     }
//
//     await Record.updateOne(
//       { _id: record },
//       { $set: { [`states.${this._id}`]: this.state } }
//     )
//
//     for (const item of next) {
//       try {
//         item.prerequisite[this._id] = this.state;
//         await item.save();
//       } catch (e) {
//         console.log('RoadmapSchema Save:', item.id, e.toString());
//       }
//     }
//   }
// })
module.exports = database.model('roadmap', RoadmapSchema)
