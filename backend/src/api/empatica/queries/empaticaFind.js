const EmpaticaService = require('../../../services/empaticaService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  empaticaFind(id: String!): Empatica!
`;

const resolver = {
  empaticaFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.empaticaRead);

    return new EmpaticaService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
