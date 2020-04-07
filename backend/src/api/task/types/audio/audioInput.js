const schema = `
  input AudioInput {
    id: String!
    url: String!
    evaluation: Int!
    resourceType: AudioEnumType = Audio
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
