const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const WearableDataService = require('../../../services/wearableDataService');

const schema = `
  wearableDataAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  wearableDataAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.wearableDataAutocomplete);

    return new WearableDataService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
