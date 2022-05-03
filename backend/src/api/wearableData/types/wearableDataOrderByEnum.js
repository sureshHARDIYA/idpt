const schema = `
  enum WearableDataOrderByEnum {
    id_ASC
    id_DESC
    dataType_ASC
    dataType_DESC
    frequency_ASC
    frequency_DESC
    timestamp_ASC
    timestamp_DESC
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
