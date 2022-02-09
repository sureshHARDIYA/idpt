const schema = `
  input BioAnalyzedFilterInput {
    id: String
    dataType: String
    score: Float
    timeStart: String
    timeEnd: String
    patientName: String
    patientId: String
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
