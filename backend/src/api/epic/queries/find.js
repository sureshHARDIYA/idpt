const Service = require('../../../services/epicService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  epicFind(id: String!): Epic!
`;

const resolver = {
  epicFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordRead);

    return await new Service(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
