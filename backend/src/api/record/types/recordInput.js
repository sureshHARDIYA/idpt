const schema = `
  input RecordInput {
    host: String!
    owner: String!
    description: String
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
