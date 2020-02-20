const schema = `
  type PatientPage {
    rows: [Patient!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
