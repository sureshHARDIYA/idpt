const schema = `
  input EmpaticaInput {
    name: String!
    description: String
    status: EmpaticaStatusEnum
    tags: String
    points: Int
    completionRequired: Boolean
    complexityLevel: Int
    type: EmpaticaTypeEnum
    next: [String!]
    owner: [String!]
    taxonomies: [ String! ]
    assignments: [String!]
    audios: [AudioInput]
    videos: [VideoInput]
    documents: [DocumentInput]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
