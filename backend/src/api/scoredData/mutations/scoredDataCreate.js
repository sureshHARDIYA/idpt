const ScoredDataService = require('../../../services/scoredDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  scoredDataCreate(data: ScoredDataInput!): ScoredData!
`;

const resolver = {
  scoredDataCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.scoredDataCreate);

    return new ScoredDataService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
