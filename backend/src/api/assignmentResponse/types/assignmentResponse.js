const schema = `
 type AssignmentResponse {
   id: String!
   assignmentID: [Assignment!]
   formData: JSON
   createdAt: DateTime
   createdBy: User
 }
`

const resolver = {}

exports.schema = schema

exports.resolver = resolver
