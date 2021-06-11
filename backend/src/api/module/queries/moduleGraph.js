const ModuleService = require('../../../services/moduleService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  moduleGraph(filter: ModuleFilterInput): ModulePage!
`;

const resolver = {
  moduleGraph: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.moduleRead);

    return new ModuleService(context).findAndCountAll({
      ...args,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
