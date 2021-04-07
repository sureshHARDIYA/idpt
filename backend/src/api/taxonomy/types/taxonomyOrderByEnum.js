const schema = `
  enum TaxonomyOrderByEnum {
    id_ASC
    id_DESC
    name_ASC
    name_DES
    parent_ASC
    parent_DESC
    children_ASC
    children_DESC
    status_ASC
    status_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
