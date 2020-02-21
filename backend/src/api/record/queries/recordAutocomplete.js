const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const RecordService = require('../../../services/recordService');

const schema = `
  recordAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  recordAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordAutocomplete);

    return new RecordService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
