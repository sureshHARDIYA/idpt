const CasedService = require('../../../services/casedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  casedCreate(data: CasedInput!): Cased!
`;

const resolver = {
  casedCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.casedCreate);

    return new CasedService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
