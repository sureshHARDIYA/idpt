const TaxonomyService = require('../../../services/taxonomyService');

const schema = `
  type Taxonomy {
    id: String!
    name: String
    parent: [Taxonomy!]
    subtaxonomies: [Taxonomy!]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
