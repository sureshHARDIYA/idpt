const schema = `
  type RoadmapPage {
    rows: [Roadmap!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
