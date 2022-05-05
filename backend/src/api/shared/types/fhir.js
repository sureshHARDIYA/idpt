
// HL7 FHIR Release 4
const schema = `
type Coding {
    system: String
    display: String!
}

type Code {
    coding: Coding
    text: String
}

type Reference {
    reference: String
    text: String
}

type Subject {
    reference: Reference
    type: String
    display: String
}

type EffectivePeriod {
    start: String!
    end: String!
}

type Device {
    display: String
}

type DerivedFrom {
    references: [Reference]
}

type FhirObservation {
    resourceType: String!
    status: String!
    code: Code
    subject: Subject
    effectivePeriod: EffectivePeriod
    device: Device
    valueString: Float!
    derivedFrom: DerivedFrom
}
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;