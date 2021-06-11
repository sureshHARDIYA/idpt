const schema = `
  input ModuleFilterInput {
    id: String
    ids: [ ID ]
    name: String
    status: ModuleStatusEnum
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
