const schema = `
  input MultipleBioDataInput {
    datas: [BioDataInput]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;