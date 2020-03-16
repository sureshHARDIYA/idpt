const schema = `
  type Audio {
    id: String!
    url: String
    audiolength: Int
    evaluationCriteria: EvaluationCriteria
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
