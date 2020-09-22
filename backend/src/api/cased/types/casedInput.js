const schema = `
  input CasedInput {
    name: String!
    description: String
    status: CasedStatusEnum!
    featuredImage: [ FileInput! ]
    modules: [ String! ]
    patients: [ String! ]
    audience: Audience
    audienceList: [String]
    availableFrom: String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
