const schema = `
  type Document {
    id: String!
    contentHTML: String
    totalreadtime: Int
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
