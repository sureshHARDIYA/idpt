const schema = `
  enum ModuleOrderByEnum {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    status_ASC
    status_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
