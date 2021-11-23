const schema = `
  type EmpaticaPage {
    rows: [Empatica!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
