const BioAnalyzedService = require('../../../services/bioAnalyzedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioAnalyzedFind(id: String!): BioAnalyzed!
`;

const resolver = {
  bioAnalyzedFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioAnalyzedRead);

    return new BioAnalyzedService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
