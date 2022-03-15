const schema = `
  input MultipleBioDataInput {
      datas: [
        dataType: String!
        frequency: String!
        timestamp: String!
        patientName: String
        patientId: String
        data: [String]
      ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;