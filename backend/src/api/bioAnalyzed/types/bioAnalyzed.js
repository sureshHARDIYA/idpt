const BioAnalyzedService = require('../../../services/bioAnalyzedService');

const schema = `
  type BioAnalyzed {
    id: String!
    type: String!
    score: Float!
    timeStart: String!
    timeEnd: String!
    patient: String
    dataId: String!
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
