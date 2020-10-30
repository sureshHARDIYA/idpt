const TaxonomyService = require('../../../services/taxonomyService');

const schema = `
  type Taxonomy {
    id: String!
    parent: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
