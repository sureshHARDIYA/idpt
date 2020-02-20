const schema = `
  input CasedInput {
    name: String!
    description: String
    status: CasedStatusEnum!
    featuredImage: [ FileInput! ]
    modules: [ String! ]
    patients: [ String! ]
    availableFrom: String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
