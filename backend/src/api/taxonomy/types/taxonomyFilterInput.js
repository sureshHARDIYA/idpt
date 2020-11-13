const schema = `
  input TaxonomyFilterInput {
    id: String
    parent: [String!]
    status: TaxonomyStatusEnum
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
