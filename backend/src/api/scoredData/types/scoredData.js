const ScoredDataService = require('../../../services/scoredDataService');

const schema = `
  type ScoredData {
    id: String!
    fhir: FhirObservation
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

/*
const schema = `
  type ScoredData {
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
*/

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
