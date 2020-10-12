const schema = `
  input AssignmentsFilterInput {
    title: String
    sub_title: String
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
