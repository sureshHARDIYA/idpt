const schema = `
  input MultipleWearableDataInput {
    datas: [WearableDataInput]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;