const RecordService = require('../../../services/recordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  recordImport(data: RecordInput!, importHash: String!): Boolean
`;

const resolver = {
  recordImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordImport);

    await new RecordService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
