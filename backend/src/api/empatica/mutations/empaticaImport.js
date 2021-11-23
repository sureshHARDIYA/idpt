const EmpaticaService = require('../../../services/empaticaService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  empaticaImport(data: EmpaticaInput!, importHash: String!): Boolean
`;

const resolver = {
  empaticaImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.empaticaImport);

    await new EmpaticaService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
