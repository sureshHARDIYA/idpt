const schema = `
  type BioAnalyzedPage {
    rows: [BioAnalyzed!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
