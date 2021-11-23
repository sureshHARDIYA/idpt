const EmpaticaService = require('../../../services/empaticaService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  empaticaDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  empaticaDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.empaticaDestroy);

    await new EmpaticaService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
