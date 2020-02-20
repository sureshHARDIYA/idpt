const schema = `
  type Audio {
    id: String!
    url: String
    audiolength: Int
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
