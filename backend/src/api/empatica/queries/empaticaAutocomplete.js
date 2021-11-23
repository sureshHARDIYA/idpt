const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const EmpaticaService = require('../../../services/empaticaService');

const schema = `
  empaticaAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  empaticaAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.empaticaAutocomplete);

    return new EmpaticaService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
