const schema = `
  input TaskInput {
    name: String!
    description: String
    status: TaskStatusEnum
    tags: String
    points: Int
    completionRequired: Boolean
    complexityLevel: Int
    type: TaskTypeEnum
    next: [String!]
    owner: [String!]
    audios: [AudioInput]
    videos: [VideoInput]
    documents: [DocumentInput]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
