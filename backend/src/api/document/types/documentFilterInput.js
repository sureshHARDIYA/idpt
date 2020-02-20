const schema = `
  input DocumentFilterInput {
    id: String
    contentHTML: String
    totalreadtimeRange: [ Int ]
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
