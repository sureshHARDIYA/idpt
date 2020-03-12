const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const RoadmapService = require('../../../services/roadmapService');

const schema = `
  roadmapAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  roadmapAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordAutocomplete);

    return new RoadmapService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
