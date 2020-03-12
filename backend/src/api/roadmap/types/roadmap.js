const schema = `
  type Roadmap {
    id: String!
    host: Module!
    record: Record!
    state: StateEnum!
    completionRequired: Boolean
    children: [Epic!]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {
  Roadmap: {
    id: (instance) => instance._id,
    host: (instance) => instance.module,
    children: (instance) => instance.children && instance.children.length > 0 ? instance.children: null
  },
};

exports.schema = schema;
exports.resolver = resolver;
