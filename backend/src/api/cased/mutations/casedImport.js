const CasedService = require('../../../services/casedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  casedImport(data: CasedInput!, importHash: String!): Boolean
`;

const resolver = {
  casedImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.casedImport);

    await new CasedService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
