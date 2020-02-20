const schema = `
  input AudioFilterInput {
    id: String
    url: String
    audiolengthRange: [ Int ]
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
