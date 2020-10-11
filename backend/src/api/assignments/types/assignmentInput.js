const schema = `
  input AssignmentInput {
    title: String!
    sub_title: String
    assignment_type: AssignmentTypeEnum
    formSchema: [FormSchemaInput]
  }

  input FormSchemaInput {
    type: QuestionEnum
    placeholder: String
    label: String!
    field: String!
    rules: [RuleInput]
    options: [OptionTypeInput]
    formSchema: [RuleInput]
  }

  input RuleInput {
    required: Boolean!
    message: String!
  }

  input OptionTypeInput {
    field: String!
    value: String!
    label: String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
