const schema = `
  type BioDataPage {
    rows: [BioData!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
