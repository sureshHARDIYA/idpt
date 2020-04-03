const schema = `
  type Document {
    id: String!
    evaluation: Int
    contentHTML: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
