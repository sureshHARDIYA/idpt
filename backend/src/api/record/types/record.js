const schema = `
  type Record {
    id: String!
    host: Cased!
    owner: Patient!
    description: String
    state: StateEnum!
    status: StatusEnum
    createdAt: DateTime
    updatedAt: DateTime
    roadmaps: [RecorcRoadmap!]
  }

  type RecorcRoadmap {
    id: String!
    host: Module!
    state: StateEnum!
    completionRequired: Boolean
    children: [RecorcRoadmapContainer!]
  }

  type RecorcRoadmapContainer {
    id: String!
    host: Task!
    state: StateEnum!
    completionRequired: Boolean
    children: [RecorcRoadmapContainer]
  }
`;

const resolver = {
  RecorcRoadmap: {
    id: (instance) => instance._id,
    host: (instance) => instance.module,
    children: (instance) => instance.children && instance.children.length > 0 ? instance.children: null
  },
  RecorcRoadmapContainer: {
    id: (instance) => instance._id,
    host: (instance) => instance.task,
    children: (instance) => instance.children && instance.children.length > 0 ? instance.children: null
  }
};

exports.schema = schema;
exports.resolver = resolver;
