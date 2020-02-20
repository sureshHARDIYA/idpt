const ModuleService = require('../../../services/moduleService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  moduleFind(id: String!): Module!
`;

const resolver = {
  moduleFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.moduleRead);

    return new ModuleService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
