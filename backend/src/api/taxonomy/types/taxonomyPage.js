const schema = `
  type TaxonomyPage {
    rows: [Taxonomy!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
