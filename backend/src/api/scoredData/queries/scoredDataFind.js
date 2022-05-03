const ScoredDataService = require('../../../services/scoredDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  scoredDataFind(id: String!): ScoredData!
`;

const resolver = {
  scoredDataFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.scoredDataRead);

    return new ScoredDataService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
