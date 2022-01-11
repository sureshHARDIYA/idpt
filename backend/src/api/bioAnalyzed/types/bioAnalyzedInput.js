const schema = `
  input BioAnalyzedInput {
    type: String!
    timeStart: DateTime
    timeEnd: DateTime
    patient: String
    data: [String]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
