const schema = `
  input ModuleFilterInput {
    id: String
    name: String
    status: ModuleStatusEnum
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
