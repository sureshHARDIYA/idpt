const schema = `
  input AudioInput {
    url: String
    audiolength: Int
    evaluationCriteria: EvaluationCriteriaInput!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
