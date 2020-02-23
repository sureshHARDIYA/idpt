const schema = `
  input VideoInput {
    url: String!
    videoLength: Int
    evaluationCriteria: VideoCriteria
  }

  input VideoCriteria {
    name: String!
    requiredWatchTime: Int
    operator: OperatoreEnum
  }
`

const resolver = {}

exports.schema = schema
exports.resolver = resolver
