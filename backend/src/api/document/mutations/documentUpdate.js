const DocumentService = require('../../../services/documentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  documentUpdate(id: String!, data: DocumentInput!): Document!
`;

const resolver = {
  documentUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.documentEdit);

    return new DocumentService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
