const { resolver: { casedList } } = require('../../cased/queries/casedList');
const { resolver: { recordList } } = require('../../record/queries/recordList');

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
    recordList(filter: RecordFilterInput, limit: Int, offset: Int, orderBy: RecordOrderByEnum): RecordPage!
  }
`;

const resolver = {
  Patient: {
    casedList,
    recordList,
  }
};

exports.schema = schema;
exports.resolver = resolver;
