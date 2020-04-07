const schema = `
  type Audio {
    id: String!
    url: String
    evaluation: Int
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {
  Audio: {
    id: (instance) => instance._id
  }
};

exports.schema = schema;
exports.resolver = resolver;
