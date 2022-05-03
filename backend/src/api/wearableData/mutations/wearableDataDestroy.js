const WearableDataService = require('../../../services/wearableDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  wearableDataDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  wearableDataDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.wearableDataDestroy);

    await new WearableDataService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
