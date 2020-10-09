const database = require('../database')
const Schema = database.Schema

/**
 * Assignment database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const AssignmentSchema = new Schema(
  {
    title: { type: String },
    sub_title: { type: String },
    formSchema: [
      {
        type: {
          type: String,
          required: true,
          enum: [
            'input',
            'textarea',
            'radio',
            'checkbox',
            'select',
            'date',
            'time'
          ],
          default: 'input'
        },
        placeholder: { type: String },
        label: { type: String, required: true },
        field: { type: String, required: true },
        rule: [
          {
            required: { type: Boolean },
            message: { type: String, required: true }
          }
        ],
        formSchema: [
          {
            required: { type: Boolean },
            message: { type: String, required: true }
          }
        ],
        options: [
          {
            field: { type: String, required: true },
            value: { type: String, required: true },
            label: { type: String, required: true }
          }
        ]
      }
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    importHash: { type: String }
  },
  { timestamps: true }
)

AssignmentSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

AssignmentSchema.set('toJSON', { getters: true })

AssignmentSchema.set('toObject', { getters: true })

const Assignment = database.model('assignment', AssignmentSchema)

module.exports = Assignment
