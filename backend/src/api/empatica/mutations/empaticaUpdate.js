const EmpaticaService = require('../../../services/empaticaService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  empaticaUpdate(id: String!, data: EmpaticaInput!): Empatica!
`;

const resolver = {
  empaticaUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.empaticaEdit);

    return new EmpaticaService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
