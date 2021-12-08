const schema = `
  input EmpaticaFilterInput {
    id: String
    type: String!
    frequency: Int!
    timestamp: Int!
    patient: User!
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
