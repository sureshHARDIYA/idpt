const database = require('../database')
const Schema = database.Schema

/**
 * Video database schema.
 * See https://mongoosejs.com/docs/models.html to learn how to customize it.
 */
const VideoSchema = new Schema(
  {
    url: { type: String, maxlength: 400 },
    videoLength: { type: Number, min: 1 },
    evaluationCriteria: {
      name: { type: String, required: true, default: 'videoLength' },
      operator: { type: String, enum: [ 'GREATERTHAN', 'LESSTHAN', 'EQUALS' ] },
      requiredWatchTime: Number
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    importHash: { type: String }
  },
  { timestamps: true }
)

VideoSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

VideoSchema.set('toJSON', { getters: true })

VideoSchema.set('toObject', { getters: true })

const Video = database.model('video', VideoSchema)

module.exports = Video
