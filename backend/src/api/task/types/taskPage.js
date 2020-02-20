const schema = `
  type TaskPage {
    rows: [Task!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
