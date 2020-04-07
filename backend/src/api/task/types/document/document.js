const schema = `
  type Document {
    id: String!
    evaluation: Int
    contentHTML: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {
  Document: {
    id: (instance) => instance._id
  }
};

exports.schema = schema;
exports.resolver = resolver;
