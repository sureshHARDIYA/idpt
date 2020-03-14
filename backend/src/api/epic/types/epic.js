const schema = `
  type Epic {
    id: String!
    host: Task!
    roadmap: Roadmap
    state: StateEnum!
    completionRequired: Boolean
    children: [Epic]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {
  Epic: {
    id: (instance) => instance._id,
    host: (instance) => instance.task,
    children: (instance) => instance.children && instance.children.length > 0 ? instance.children: null
  }
};

exports.schema = schema;
exports.resolver = resolver;
