const schema = `
  type EpicPage {
    rows: [Epic!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
