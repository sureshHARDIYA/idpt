const schema = `
  input TaxonomyInput {
    parent: [String!]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
