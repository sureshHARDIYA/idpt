const schema = `
  enum BioAnalyzedOrderByEnum {
    id_ASC
    id_DESC
    type_ASC
    type_DESC
    score_ASC
    score_DESC
    timeStart_ASC
    timeStart_DESC
    timeEnd_ASC
    timeEnd_DESC
    status_ASC
    status_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
