const database = require('../database')
const Schema = database.Schema

/**
 * Assignment database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const AssignmentResponseSchema = new Schema(
  {
    assignmentID: [ { type: Schema.Types.ObjectId, ref: 'assignment' } ],
    formData: { type: Schema.Types.Mixed },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    importHash: { type: String }
  },
  { timestamps: true }
)

AssignmentResponseSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

AssignmentResponseSchema.set('toJSON', { getters: true })

AssignmentResponseSchema.set('toObject', { getters: true })

const AssignmentResponse = database.model(
  'assignmentResponse',
  AssignmentResponseSchema
)

module.exports = AssignmentResponse
