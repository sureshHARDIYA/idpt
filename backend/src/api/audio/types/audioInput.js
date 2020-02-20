const schema = `
  input AudioInput {
    url: String
    audiolength: Int
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
