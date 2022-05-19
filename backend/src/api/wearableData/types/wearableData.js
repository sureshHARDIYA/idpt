const schema = `
  type WearableData {
    id: String!
    fhir: FhirObservation
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
