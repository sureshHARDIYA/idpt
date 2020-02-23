const schema = `
  type VideoPage {
    rows: [Video!]!
    count: Int!
  }
`

const resolver = {}

exports.schema = schema
exports.resolver = resolver
