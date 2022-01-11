const schema = `
  input BioAnalyzedFilterInput {
    id: String
    type: String
    timeStart: DateTime
    timeEnd: DateTime
    patient: String
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
