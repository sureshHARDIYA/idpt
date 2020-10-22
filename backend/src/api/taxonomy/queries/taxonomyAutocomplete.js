const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const TaxonomyService = require('../../../services/taxonomyService');

const schema = `
  taxonomyAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  taxonomyAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.taxonomyAutocomplete);

    return new TaxonomyService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
