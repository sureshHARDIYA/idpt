const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const CasedService = require('../../../services/casedService');

const schema = `
  casedAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  casedAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.casedAutocomplete);

    return new CasedService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
