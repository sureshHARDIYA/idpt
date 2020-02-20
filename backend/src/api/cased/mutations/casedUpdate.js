const CasedService = require('../../../services/casedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  casedUpdate(id: String!, data: CasedInput!): Cased!
`;

const resolver = {
  casedUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.casedEdit);

    return new CasedService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
