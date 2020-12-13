const schema = `
  input TaxonomyInput {
    name: String!
    parent: [String!]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
