const RecordService = require('../../../services/recordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  recordUpdate(id: String!, data: RecordInput!): Record!
`;

const resolver = {
  recordUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordEdit);

    return new RecordService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
