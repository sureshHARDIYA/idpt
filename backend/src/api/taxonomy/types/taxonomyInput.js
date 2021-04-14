const schema = `
  input TaxonomyInput {
    name: String!
    parent: [String!]
    subtaxonomies: [String!]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
