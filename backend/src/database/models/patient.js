const database = require('../database');
const Schema = database.Schema;

/**
 * Patient database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const PatientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    birthdate: {
      type: String,
    },
    gender: {
      type: String,
      enum: [
        "male",
        "female",
        null
      ],
    },
    phone: {
      type: String,
      required: true,
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

PatientSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

PatientSchema.set('toJSON', {
  getters: true,
});

PatientSchema.set('toObject', {
  getters: true,
});

PatientSchema.virtual('records', {
  ref: 'record',
  localField: '_id',
  foreignField: 'owner',
});


const Patient = database.model('patient', PatientSchema);

module.exports = Patient;
