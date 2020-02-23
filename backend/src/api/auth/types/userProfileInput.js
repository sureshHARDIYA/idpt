const schema = `
  input UserProfileInput {
    firstName: String
    lastName: String
    phoneNumber: String
    patient: String
    avatars: [FileInput!]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
