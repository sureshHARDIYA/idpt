const schema = `
  type AssignmentsPage {
    rows: [Assignment!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
