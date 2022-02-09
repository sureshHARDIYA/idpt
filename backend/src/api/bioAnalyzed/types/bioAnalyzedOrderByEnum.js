const schema = `
  enum BioAnalyzedOrderByEnum {
    id_ASC
    id_DESC
    dataType_ASC
    dataType_DESC
    score_ASC
    score_DESC
    timeStart_ASC
    timeStart_DESC
    timeEnd_ASC
    timeEnd_DESC
    patientName_ASC
    patientName_DESC
    patientId_ASC
    patientId_DESC
    status_ASC
    status_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
