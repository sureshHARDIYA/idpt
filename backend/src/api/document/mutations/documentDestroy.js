const DocumentService = require('../../../services/documentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  documentDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  documentDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.documentDestroy);

    await new DocumentService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
