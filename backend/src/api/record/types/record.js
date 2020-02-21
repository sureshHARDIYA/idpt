const schema = `
  type Record {
    id: String!
    host: Cased!
    owner: Patient!
    description: String
    status: StatusEnum
    createdAt: DateTime
    updatedAt: DateTime
    roadmap: [RecorcRoadmap!]
  }

  type RecorcRoadmap {
    host: Module!
    state: StateEnum!
    completionRequired: Boolean
    children: [RecorcRoadmapContainer!]
  }

  type RecorcRoadmapContainer {
    host: Task!
    state: StateEnum!
    completionRequired: Boolean
    children: [RecorcRoadmapContainer]
  }
`;

const resolver = {
  RecorcRoadmapContainer: {
    children: (parent) => parent.children && parent.children.length > 0 ? parent.children: null
  }
};

exports.schema = schema;
exports.resolver = resolver;
