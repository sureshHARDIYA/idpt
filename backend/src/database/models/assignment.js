const database = require('../database');
const Schema = database.Schema;

const questionSchema = new Schema({
  title: { type: String, required: true },
  _id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      'SINGLE_LINE_TEXT',
      'CHECKBOXES',
      'DROPDOWN',
      'MULTI_CHOICE',
      'MUTLI_LINE_TEXT',
    ],
    default: 'SINGLE_LINE_TEXT',
  },
  options: [
    {
      content: {
        type: String,
        required: true,
      },
      _id: {
        type: String,
        required: true,
      },
    },
  ],
  placeholder: {
    type: String,
  },
});

/**
 * Assignment database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const AssignmentSchema = new Schema(
  {
    title: {
      type: String,
    },
    sub_title: {
      type: String,
    },
    questions: [questionSchema],
    publish_survey: {
      type: Boolean,
      required: false,
      default: true,
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

AssignmentSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

AssignmentSchema.set('toJSON', {
  getters: true,
});

AssignmentSchema.set('toObject', {
  getters: true,
});

const Assignment = database.model(
  'assignment',
  AssignmentSchema,
);

module.exports = Assignment;
