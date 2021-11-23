const schema = `
  input EmpaticaFilterInput {
    id: String
    name: String
    description: String
    status: EmpaticaStatusEnum
    tags: String
    pointsRange: [ Int ]
    completionRequired: Boolean
    complexityLevelRange: [ Int ]
    type: EmpaticaTypeEnum
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
