const schema = `
  input EvaluationCriteriaInput {
    field: String!
    valueRequired: String!
    operator: EvaluationCriteriaoperator!
  }

  type EvaluationCriteria {
    field: String
    valueRequired: String
    operator: EvaluationCriteriaoperator
  }

  enum EvaluationCriteriaoperator {
    EQUALS
    LESSTHAN
    GREATERTHAN
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
