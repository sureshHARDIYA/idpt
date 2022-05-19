const schema = `
  input WearableDataInput {
    fhir: FhirObservationInput
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
