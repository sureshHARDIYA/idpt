const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const Service = require('../../../services/epicService');

const schema = `
  epicAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  epicAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordAutocomplete);

    return new Service(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
