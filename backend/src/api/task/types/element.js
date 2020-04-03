const schema = `
  union Element = Document | Video | Audio
`;

const resolver = {
  Element: {
    __resolveType: (obj) => obj.resourceType
  }
};

exports.schema = schema;
exports.resolver = resolver;
