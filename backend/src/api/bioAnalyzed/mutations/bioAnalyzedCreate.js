const BioAnalyzedService = require('../../../services/bioAnalyzedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioAnalyzedCreate(data: BioAnalyzedInput!): BioAnalyzed!
`;

const resolver = {
  bioAnalyzedCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioAnalyzedCreate);

    return new BioAnalyzedService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
