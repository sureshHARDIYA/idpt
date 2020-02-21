const RecordService = require('../../../services/recordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  recordDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  recordDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordDestroy);

    await new RecordService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
