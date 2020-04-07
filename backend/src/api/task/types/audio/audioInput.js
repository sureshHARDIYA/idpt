const schema = `
  input AudioInput {
    url: String!
    evaluation: Int!
    resourceType: AudioEnumType = Audio
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
