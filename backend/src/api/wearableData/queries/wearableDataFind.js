const WearableDataService = require('../../../services/wearableDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  wearableDataFind(id: String!): WearableData!
`;

const resolver = {
  wearableDataFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.wearableDataRead);

    return new WearableDataService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
