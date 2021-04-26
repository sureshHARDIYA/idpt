const schema = `
  type assignmentResponsePage {
    rows: [AssignmentResponse!]!
    count: Int!
  }
`

const resolver = {}

exports.schema = schema
exports.resolver = resolver
