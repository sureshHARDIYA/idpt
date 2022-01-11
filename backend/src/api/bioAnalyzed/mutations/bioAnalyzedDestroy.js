const BioAnalyzedService = require('../../../services/bioAnalyzedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioAnalyzedDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  bioAnalyzedDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioAnalyzedDestroy);

    await new BioAnalyzedService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
