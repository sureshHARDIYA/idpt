const schema = `
  type AssignmentResponsePage {
    rows: [Assignment!]!
    count: Int!
  }
`

const resolver = {}

exports.schema = schema
exports.resolver = resolver
