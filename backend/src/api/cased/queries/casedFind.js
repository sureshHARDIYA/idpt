const CasedService = require('../../../services/casedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  casedFind(id: String!): Cased!
`;

const resolver = {
  casedFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.casedRead);

    return new CasedService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
