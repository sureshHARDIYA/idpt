const { resolver: { casedList } } = require('../../cased/queries/casedList');

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

    casedList(filter: CasedFilterInput, limit: Int, offset: Int, orderBy: CasedOrderByEnum): CasedPage
  }
`;

const resolver = {
  Patient: {
    casedList
  }
};

exports.schema = schema;
exports.resolver = resolver;
