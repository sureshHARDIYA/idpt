const schema = `
  enum AssignmentsOrderByEnum {
    id_ASC
    id_DESC
    title_ASC
    title_DESC
    sub_title_ASC
    sub_title_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
