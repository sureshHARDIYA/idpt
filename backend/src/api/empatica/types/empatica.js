const EmpaticaService = require('../../../services/empaticaService');

const schema = `
  type Empatica {
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
