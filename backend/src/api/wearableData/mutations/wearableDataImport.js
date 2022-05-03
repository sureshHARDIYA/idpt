const WearableDataService = require('../../../services/wearableDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  wearableDataImport(data: WearableDataInput!, importHash: String!): Boolean
`;

const resolver = {
  wearableDataImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.wearableDataImport);

    await new WearableDataService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
