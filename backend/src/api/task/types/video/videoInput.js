const schema = `
  input VideoInput {
    url: String!
    evaluation: Int!
    resourceType: VideoEnumType = Video
  }
`

const resolver = {}

exports.schema = schema
exports.resolver = resolver
