const schema = `
  type Task {
    id: String!
    name: String
    description: String
    status: TaskStatusEnum
    tags: String
    points: Int
    completionRequired: Boolean
    complexityLevel: Int
    type: TaskTypeEnum
    owner: [ Module! ]
    elements: [ Document! ]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
