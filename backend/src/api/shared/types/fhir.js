
// HL7 FHIR Release 4
const schema = `
type FhirObservation {
    resourceType: String!
    status: String!
    code: {
        coding: {
            system: String
            display: String!
        }
        text: String
    }
    subject: {
        reference: {
            reference: String
        }
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
    derivedFrom: {
        references: [
            {
                reference : String
                text : String
            }
        ]
    }
}
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;