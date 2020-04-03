const schema = `
  input DocumentInput {
    id: String!
    evaluation: Int!
    contentHTML: String!
    resourceType: DocumentEnumType = Document
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
