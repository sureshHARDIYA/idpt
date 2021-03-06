const schema = `
  input IamEditInput {
    id: String!
    firstName: String
    lastName: String
    phoneNumber: String
    avatars: [FileInput!]
    roles: [ String! ]!
    patient: String
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
