const schema = `
  type WearableDataPage {
    rows: [WearableData!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
