const schema = `
  enum VideoOrderByEnum {
    id_ASC
    id_DESC
    url_ASC
    url_DESC
    videoLength_ASC
    videoLength_DESC
    createdAt_ASC
    createdAt_DESC
  }
`

const resolver = {}

exports.schema = schema
exports.resolver = resolver
