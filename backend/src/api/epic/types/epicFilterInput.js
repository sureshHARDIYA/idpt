const schema = `
  input EpicFilterInput {
    id: String
    createdAtRange: [DateTime]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
