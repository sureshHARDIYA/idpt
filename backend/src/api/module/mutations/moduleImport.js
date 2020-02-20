const ModuleService = require('../../../services/moduleService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  moduleImport(data: ModuleInput!, importHash: String!): Boolean
`;

const resolver = {
  moduleImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.moduleImport);

    await new ModuleService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
