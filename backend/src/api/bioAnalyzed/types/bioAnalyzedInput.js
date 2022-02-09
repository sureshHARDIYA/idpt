const schema = `
  input BioAnalyzedInput {
    dataType: String!
    score: Float!
    timeStart: String
    timeEnd: String
    patientName: String
    patientId: String
    dataId: String
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
