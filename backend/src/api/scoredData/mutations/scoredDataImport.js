const ScoredDataService = require('../../../services/scoredDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  scoredDataImport(data: ScoredDataInput!, importHash: String!): Boolean
`;

const resolver = {
  scoredDataImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.scoredDataImport);

    await new ScoredDataService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
