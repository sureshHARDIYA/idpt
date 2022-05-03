const ScoredDataService = require('../../../services/scoredDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  scoredDataList(filter: ScoredDataFilterInput, limit: Int, offset: Int, orderBy: ScoredDataOrderByEnum): ScoredDataPage!
`;

const resolver = {
  scoredDataList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.scoredDataRead);

    return new ScoredDataService(context).findAndCountAll({
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
