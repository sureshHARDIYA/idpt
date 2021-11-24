const EmpaticaService = require('../../../services/empaticaService');

const schema = `
  type Empatica {
    id: String!
    name: String!
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
