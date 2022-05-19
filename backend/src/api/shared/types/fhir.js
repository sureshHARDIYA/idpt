
// HL7 FHIR Release 4
const schema = `
type Coding {
    system: String
    display: String!
}

type Code {
    coding: [Coding]
    text: String
}

type Reference {
    reference: String
    text: String
}

type Subject {
    reference: String
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

type SimpleQuantity {
    value: String
}

type ValueSampledData {
    origin: SimpleQuantity
    period: Float
    dimensions: Int
    data: [String]
}

type FhirObservation {
    resourceType: String!
    status: String!
    code: Code
    subject: Subject
    effectivePeriod: EffectivePeriod
    device: Device
    valueSampledData: ValueSampledData
    valueString: Float
    derivedFrom: DerivedFrom
}
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;