const schema = `
  type ModulePage {
    rows: [Module!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
