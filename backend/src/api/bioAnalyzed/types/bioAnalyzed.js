const BioAnalyzedService = require('../../../services/bioAnalyzedService');

const schema = `
  type BioAnalyzed {
    id: String!
    type: String!
    timeStart: DateTime!
    timeEnd: DateTime!
    patient: String
    dataId: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
