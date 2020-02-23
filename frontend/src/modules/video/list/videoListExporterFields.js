import model from 'modules/video/videoModel'

const { fields } = model

export default [
  fields.id,
  fields.url,
  fields.videoLength,
  fields.createdAt,
  fields.updatedAt
]
