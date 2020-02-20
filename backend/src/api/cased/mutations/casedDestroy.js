const CasedService = require('../../../services/casedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  casedDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  casedDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.casedDestroy);

    await new CasedService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
