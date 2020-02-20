const ModuleService = require('../../../services/moduleService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  moduleDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  moduleDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.moduleDestroy);

    await new ModuleService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
