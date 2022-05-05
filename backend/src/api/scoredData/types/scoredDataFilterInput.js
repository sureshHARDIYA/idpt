const schema = `
input ScoredDataFilterInput {
  id: String
  createdAtRange: [ DateTime ]
}
`;

/*
TODO
const schema = `
input ScoredDataFilterInput {
  id: String
  fhir: FhirObservationInput
  createdAtRange: [ DateTime ]
}
`;
*/

/*const oldSchema = `
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
*/

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
