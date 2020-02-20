const schema = `
  input DocumentInput {
    contentHTML: String
    totalreadtime: Int
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
