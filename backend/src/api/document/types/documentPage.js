const schema = `
  type DocumentPage {
    rows: [Document!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
