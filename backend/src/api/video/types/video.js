const schema = `
  type Video {
    id: String!
    url: String!
    videoLength: Int
    evaluationCriteria: Criteria,
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Criteria {
    name: String
    requiredWatchTime: Int
    operator: OperatoreEnum
  }
`

const resolver = {}

exports.schema = schema
exports.resolver = resolver
