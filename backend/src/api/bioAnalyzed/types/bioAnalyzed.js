const BioAnalyzedService = require('../../../services/bioAnalyzedService');

const schema = `
  type BioAnalyzed {
    id: String!
    dataType: String!
    score: Float!
    timeStart: String!
    timeEnd: String!
    patientName: String
    patientId: String
    dataId: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
