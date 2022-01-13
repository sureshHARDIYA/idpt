const schema = `
  input BioAnalyzedInput {
    type: String!
    score: Float!
    timeStart: String
    timeEnd: String
    patient: String
    dataId: String
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
