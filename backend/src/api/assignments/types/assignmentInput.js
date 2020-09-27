const schema = `
  input AssignmentInput {
    title: String!
    sub_title: String
    questions: [QuestionsInput]
    publish_survey: Boolean
  }

  input QuestionsInput {
    title: String!
    _id: String!
    type: optionEnum
    options: [OptionsInput]
    placeholder: String
  }

  input OptionsInput {
    content: String!
    _id:  String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
