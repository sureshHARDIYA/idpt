const schema = `
  input PatientInput {
    name: String!
    birthdate: String
    gender: PatientGenderEnum
    assignCase: [ String! ]
    phone: String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
