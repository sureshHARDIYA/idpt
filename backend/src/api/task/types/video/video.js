const schema = `
  type Video {
    id: String!
    url: String
    evaluation: Int
    createdAt: DateTime
    updatedAt: DateTime
  }
`

const resolver = {
  Video: {
    id: (instance) => instance._id
  }
}

exports.schema = schema
exports.resolver = resolver
