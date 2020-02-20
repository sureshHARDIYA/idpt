const ModuleService = require('../../../services/moduleService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  moduleUpdate(id: String!, data: ModuleInput!): Module!
`;

const resolver = {
  moduleUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.moduleEdit);

    return new ModuleService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
