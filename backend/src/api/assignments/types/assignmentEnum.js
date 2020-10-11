const schema = `
  enum QuestionEnum {
    input
    textarea
    radio
    checkbox
    select
    date
    time
    confirm
  }

  enum AssignmentTypeEnum {
    survey
    quiz
    psycometric_assessment
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
