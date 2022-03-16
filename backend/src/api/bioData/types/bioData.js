const schema = `
  type BioData {
    id: String!
    dataType: String!
    frequency: String!
    timestamp: String!
    patientName: String
    patientId: String
    data: [String]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
