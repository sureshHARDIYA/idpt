const schema = `
  type AudioPage {
    rows: [Audio!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
