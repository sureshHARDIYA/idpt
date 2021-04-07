const schema = `
  input TaxonomyInput {
    name: String!
    parent: [String!]
    children: [String!]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
