const schema = `
  input EmpaticaInput {
    name: String!
    status: EmpaticaStatusEnum
    owner: [String!]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
