const schema = `
  type Module {
    id: String!
    owner: [ Cased! ]
    name: String
    description: String
    status: ModuleStatusEnum
    tasks: [ Task! ]
    featuredImage: [ File! ]
    prerequisite: [ Module! ]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
