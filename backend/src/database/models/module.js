const database = require('../database');
const Schema = database.Schema;
const { FileSchema } = require('./file');

/**
 * Module database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const ModuleSchema = new Schema(
  {
    owner: [{
      type: Schema.Types.ObjectId,
      ref: 'cased',
    }],
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
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: 'task',
    }],
    taxonomies: [{
      type: Schema.Types.ObjectId,
      ref: 'taxonomy',
    }],
    featuredImage: [FileSchema],
    prerequisite: [{
      type: Schema.Types.ObjectId,
      ref: 'module',
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

ModuleSchema.statics.getRoadmap =  async function(id) {
  return await this.find({ owner: { $in: [id] } }, 'id');
}

ModuleSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

ModuleSchema.set('toJSON', {
  getters: true,
});

ModuleSchema.set('toObject', {
  getters: true,
});

const Module = database.model('module', ModuleSchema);

module.exports = Module;
