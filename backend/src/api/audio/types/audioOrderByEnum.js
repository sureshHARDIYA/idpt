const schema = `
  enum AudioOrderByEnum {
    id_ASC
    id_DESC
    url_ASC
    url_DESC
    audiolength_ASC
    audiolength_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
