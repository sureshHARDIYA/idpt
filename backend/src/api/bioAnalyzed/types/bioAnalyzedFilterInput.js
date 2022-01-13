const schema = `
  input BioAnalyzedFilterInput {
    id: String
    type: String
    score: Float
    timeStart: String
    timeEnd: String
    patient: String
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
