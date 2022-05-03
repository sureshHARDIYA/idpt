const schema = `
  type ScoredDataPage {
    rows: [ScoredData!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;