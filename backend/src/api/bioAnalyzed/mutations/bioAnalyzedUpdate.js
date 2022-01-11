const BioAnalyzedService = require('../../../services/bioAnalyzedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioAnalyzedUpdate(id: String!, data: BioAnalyzedInput!): BioAnalyzed!
`;

const resolver = {
  bioAnalyzedUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioAnalyzedEdit);

    return new BioAnalyzedService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
