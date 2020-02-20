const ModuleService = require('../../../services/moduleService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  moduleCreate(data: ModuleInput!): Module!
`;

const resolver = {
  moduleCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.moduleCreate);

    return new ModuleService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
