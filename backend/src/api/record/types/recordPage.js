const schema = `
  type RecordPage {
    rows: [Record!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
