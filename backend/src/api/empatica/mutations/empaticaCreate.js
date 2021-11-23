const EmpaticaService = require('../../../services/empaticaService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  empaticaCreate(data: EmpaticaInput!): Empatica!
`;

const resolver = {
  empaticaCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.empaticaCreate);

    return new EmpaticaService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
