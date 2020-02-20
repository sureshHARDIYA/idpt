const schema = `
  type CasedPage {
    rows: [Cased!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
