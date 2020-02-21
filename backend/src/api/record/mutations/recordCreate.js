const RecordService = require('../../../services/recordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  recordCreate(data: RecordInput!): Record!
`;

const resolver = {
  recordCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordCreate);

    return new RecordService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
