const DocumentService = require('../../../services/documentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  documentImport(data: DocumentInput!, importHash: String!): Boolean
`;

const resolver = {
  documentImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.documentImport);

    await new DocumentService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
