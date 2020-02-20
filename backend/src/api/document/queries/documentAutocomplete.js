const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const DocumentService = require('../../../services/documentService');

const schema = `
  documentAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  documentAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.documentAutocomplete);

    return new DocumentService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
