const schema = `
  input VideoFilterInput {
    id: String
    url: String
    videoLengthRange: [ Int ]
    createdAtRange: [ DateTime ]
  }
`

const resolver = {}

exports.schema = schema
exports.resolver = resolver
