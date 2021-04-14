const schema = `
  input TaxonomyFilterInput {
    id: String
    name: String
    parent: [String!]
    subtaxonomies: [String!]
    status: TaxonomyStatusEnum
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
