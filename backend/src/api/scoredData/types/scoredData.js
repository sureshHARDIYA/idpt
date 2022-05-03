const ScoredDataService = require('../../../services/scoredDataService');

const oldSchema = `
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

// HL7 FHIR Release 4
const schema = `
  type ScoredData {
    id: String!
    fhir: {
      resourceType: String
      status: String
      code: {
        coding: [
          {
            system: String
            code: String
            display: String!
          }
        ]
        text: String
      }
      subject: {
        reference: String
        type: String
        display: String
      }
      effectivePeriod: {
        start: String!
        end: String!
      }
      device: {
        display: String
      }
      valueString: Float!
      derivedFrom: [
        {
          reference : String
          text : String
        }
      ]
    }
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
