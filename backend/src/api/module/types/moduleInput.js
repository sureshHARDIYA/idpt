const schema = `
  input ModuleInput {
    owner: [ String! ]
    name: String!
    description: String
    status: ModuleStatusEnum
    tasks: [ String! ]
    taxonomies: [ String! ]
    featuredImage: [ FileInput! ]
    prerequisite: [ String! ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
