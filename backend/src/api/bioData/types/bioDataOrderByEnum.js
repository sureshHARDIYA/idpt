const schema = `
  enum BioDataOrderByEnum {
    id_ASC
    id_DESC
    type_ASC
    type_DESC
    frequency_ASC
    frequency_DESC
    timestamp_ASC
    timestamp_DESC
    status_ASC
    status_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
