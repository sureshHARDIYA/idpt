const schema = `
  input RecordInput {
    host: String!
    owner: String!
    description: String
  }

  input RoadmapOption {
    task: String
    module: String
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
