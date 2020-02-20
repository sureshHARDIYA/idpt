const DocumentService = require('../../../services/documentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  documentList(filter: DocumentFilterInput, limit: Int, offset: Int, orderBy: DocumentOrderByEnum): DocumentPage!
`;

const resolver = {
  documentList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.documentRead);

    return new DocumentService(context).findAndCountAll({
      ...args,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
