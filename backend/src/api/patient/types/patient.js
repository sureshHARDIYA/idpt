const schema = `
  type Patient {
    id: String!
    name: String
    birthdate: String
    gender: PatientGenderEnum
    user: User
    phone: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
