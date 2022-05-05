
const schema = `
  input ScoredDataInput {
    id: String!
    fhir: FhirObservationInput
  }
`;

/*const schema = `
  input ScoredDataInput {
    dataType: String!
    score: Float!
    timeStart: String
    timeEnd: String
    patientName: String
    patientId: String
    dataId: String
  }
`;
*/


const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
