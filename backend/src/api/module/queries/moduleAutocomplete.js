const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const ModuleService = require('../../../services/moduleService');

const schema = `
  moduleAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  moduleAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.moduleAutocomplete);

    return new ModuleService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
