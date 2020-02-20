const schema = `
  enum DocumentOrderByEnum {
    id_ASC
    id_DESC
    contentHTML_ASC
    contentHTML_DESC
    totalreadtime_ASC
    totalreadtime_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
