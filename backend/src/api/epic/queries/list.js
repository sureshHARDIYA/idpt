const Service = require('../../../services/epicService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  epicList(filter: AudioFilterInput, limit: Int, offset: Int, orderBy: AudioOrderByEnum): EpicPage!
`;

const resolver = {
  epicList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordRead);

    return new Service(context).findAndCountAll({
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
