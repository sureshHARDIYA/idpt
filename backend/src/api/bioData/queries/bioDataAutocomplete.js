const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const BioDataService = require('../../../services/bioDataService');

const schema = `
  bioDataAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  bioDataAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioDataAutocomplete);

    return new BioDataService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
