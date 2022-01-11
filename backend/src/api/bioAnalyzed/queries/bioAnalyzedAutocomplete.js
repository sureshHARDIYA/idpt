const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const BioAnalyzedService = require('../../../services/bioAnalyzedService');

const schema = `
  bioAnalyzedAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  bioAnalyzedAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioAnalyzedAutocomplete);

    return new BioAnalyzedService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
