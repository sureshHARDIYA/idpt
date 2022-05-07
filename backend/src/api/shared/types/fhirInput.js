
// HL7 FHIR Release 4
const schema = `
input CodingInput {
    system: String
    display: String
}

input CodeInput {
    coding: CodingInput
    text: String
}

input ReferenceInput {
    reference: String
    text: String
}

input SubjectInput {
    reference: ReferenceInput
    type: String
    display: String
}

input EffectivePeriodInput {
    start: String
    end: String
}

input DeviceInput {
    display: String
}

input DerivedFromInput {
    references: [ReferenceInput]
}

input SimpleQuantityInput {
    value: String
}

input ValueSampledDataInput {
    origin: SimpleQuantityInput
    period: Float
    dimensions: Int
    data: [String]
}

input FhirObservationInput {
    resourceType: String
    status: String
    code: CodeInput
    subject: SubjectInput
    effectivePeriod: EffectivePeriodInput
    device: DeviceInput
    valueSampledData: ValueSampledDataInput
    valueString: Float
    derivedFrom: DerivedFromInput
}
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;