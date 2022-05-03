const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const ScoredDataService = require('../../../services/scoredDataService');

const schema = `
  scoredDataAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  scoredDataAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.scoredDataAutocomplete);

    return new ScoredDataService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
