const database = require('../database');
const Schema = database.Schema;

/**
 * Audio database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const AudioSchema = new Schema(
  {
    url: {
      type: String,
      minlength: 200,
    },
    audiolength: {
      type: Number,
      min: 1,
    },
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

AudioSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

AudioSchema.set('toJSON', {
  getters: true,
});

AudioSchema.set('toObject', {
  getters: true,
});

const Audio = database.model('audio', AudioSchema);

module.exports = Audio;
