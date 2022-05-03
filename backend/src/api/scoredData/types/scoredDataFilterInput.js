const oldSchema = `
  input ScoredDataFilterInput {
    id: String
    dataType: String
    score: Float
    timeStart: String
    timeEnd: String
    patientName: String
    patientId: String
    createdAtRange: [ DateTime ]
  }
`;

// HL7 FHIR Release 4
const schema = `
input ScoredDataFilterInput {
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
  createdAtRange: [ DateTime ]
}
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
