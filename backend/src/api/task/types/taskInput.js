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
    owner: [ String! ]
    elements: [ String! ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
