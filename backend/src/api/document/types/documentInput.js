const schema = `
  input DocumentInput {
    contentHTML: String!
    totalreadtime: Int!
    evaluationCriteria: EvaluationCriteriaInput!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
