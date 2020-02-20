const schema = `
  input TaskFilterInput {
    id: String
    name: String
    description: String
    status: TaskStatusEnum
    tags: String
    pointsRange: [ Int ]
    completionRequired: Boolean
    complexityLevelRange: [ Int ]
    type: TaskTypeEnum
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
