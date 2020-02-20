const DocumentService = require('../../../services/documentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  documentFind(id: String!): Document!
`;

const resolver = {
  documentFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.documentRead);

    return new DocumentService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
