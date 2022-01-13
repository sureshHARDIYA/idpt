const BioDataService = require('../../../services/bioDataService');

const schema = `
  type BioData {
    id: String!
    type: String!
    frequency: String!
    timestamp: String!
    patient: String
    data: [String]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
