const schema = `
  enum EmpaticaOrderByEnum {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    description_ASC
    description_DESC
    status_ASC
    status_DESC
    tags_ASC
    tags_DESC
    points_ASC
    points_DESC
    completionRequired_ASC
    completionRequired_DESC
    complexityLevel_ASC
    complexityLevel_DESC
    type_ASC
    type_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
