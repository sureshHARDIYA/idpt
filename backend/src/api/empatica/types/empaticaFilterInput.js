const schema = `
  input EmpaticaFilterInput {
    id: String
    name: String
    status: EmpaticaStatusEnum
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
