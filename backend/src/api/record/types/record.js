const schema = `
  type Record {
    id: String!
    host: Cased!
    owner: Patient!
    description: String
    state: StateEnum!
    status: StatusEnum
    roadmaps: [Roadmap!]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
