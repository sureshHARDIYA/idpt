const schema = `
  enum StateEnum {
    LOCKED
    ACTIVATE
    PROGRESS
    COMPLETE
  }

  enum StatusEnum {
    ACTIVE
    INACTIVE
    DRAFT
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
