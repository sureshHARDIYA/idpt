const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const AudioService = require('../../../services/audioService');

const schema = `
  audioAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  audioAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.audioAutocomplete);

    return new AudioService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
