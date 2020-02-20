const schema = `
  input CasedFilterInput {
    id: String
    name: String
    description: String
    status: CasedStatusEnum
    availableFromRange: [ String ]
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
