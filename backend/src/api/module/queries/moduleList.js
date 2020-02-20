const ModuleService = require('../../../services/moduleService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  moduleList(filter: ModuleFilterInput, limit: Int, offset: Int, orderBy: ModuleOrderByEnum): ModulePage!
`;

const resolver = {
  moduleList: async (root, args, context, info) => {
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
