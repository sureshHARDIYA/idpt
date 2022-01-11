const BioAnalyzedService = require('../../../services/bioAnalyzedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioAnalyzedImport(data: BioAnalyzedInput!, importHash: String!): Boolean
`;

const resolver = {
  bioAnalyzedImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioAnalyzedImport);

    await new BioAnalyzedService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
