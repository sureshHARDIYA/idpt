const ScoredDataService = require('../../../services/scoredDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  scoredDataUpdate(id: String!, data: ScoredDataInput!): ScoredData!
`;

const resolver = {
  scoredDataUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.scoredDataEdit);

    return new ScoredDataService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
