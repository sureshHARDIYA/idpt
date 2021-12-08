const EmpaticaService = require('../../../services/empaticaService');

const schema = `
  type Empatica {
    id: String!
    type: String!
    frequency: Int!
    timestamp: Int!
    patient: User!
    data: [String!]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
