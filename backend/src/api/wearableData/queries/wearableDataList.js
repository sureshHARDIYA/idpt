const WearableDataService = require('../../../services/wearableDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  wearableDataList(filter: WearableDataFilterInput, limit: Int, offset: Int, orderBy: WearableDataOrderByEnum): WearableDataPage!
`;

const resolver = {
  wearableDataList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.wearableDataRead);

    return new WearableDataService(context).findAndCountAll({
      ...args,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
