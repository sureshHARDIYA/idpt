const ScoredDataService = require('../../../services/scoredDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  scoredDataDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  scoredDataDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.scoredDataDestroy);

    await new ScoredDataService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
