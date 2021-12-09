const schema = `
  input EmpaticaInput {
    type: String!
    frequency: String!
    timestamp: String!
    patient: String
    data: [String]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
