const schema = `
  input PatientFilterInput {
    id: String
    name: String
    birthdateRange: [ String ]
    gender: PatientGenderEnum
    phone: String
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
