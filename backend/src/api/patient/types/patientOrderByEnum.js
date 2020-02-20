const schema = `
  enum PatientOrderByEnum {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    birthdate_ASC
    birthdate_DESC
    gender_ASC
    gender_DESC
    phone_ASC
    phone_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
