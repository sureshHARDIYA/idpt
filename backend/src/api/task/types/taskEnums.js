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

  enum OperatoreEnum {
    GREATERTHAN
    LESSTHAN
    EQUALS
  }

  enum AudioEnumType {
    Audio
  }

  enum VideoEnumType {
    Video
  }

  enum DocumentEnumType {
    Document
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
