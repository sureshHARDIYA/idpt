const WearableDataService = require('../../../services/wearableDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  wearableDataUpdate(id: String!, data: WearableDataInput!): WearableData!
`;

const resolver = {
  wearableDataUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.wearableDataEdit);

    return new WearableDataService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
