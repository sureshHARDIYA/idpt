const DocumentService = require('../../../services/documentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  documentCreate(data: DocumentInput!): Document!
`;

const resolver = {
  documentCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.documentCreate);

    return new DocumentService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
