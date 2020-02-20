const schema = `
  enum TaskStatusEnum {
    ACTIVE
    INACTIVE
    DRAFT
  }

  enum TaskTypeEnum {
    AUDIO
    VIDEO
    TEXT
    ASSESSMENT
    FEEDBACK
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
