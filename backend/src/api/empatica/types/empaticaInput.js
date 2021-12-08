const schema = `
  input EmpaticaInput {
    type: String!
    frequency: Int!
    timestamp: Int!
    patient: User!
    data: [String!]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
