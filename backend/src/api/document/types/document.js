const schema = `
  type Document {
    id: String!
    contentHTML: String
    totalreadtime: Int
    evaluationCriteria: EvaluationCriteria
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
