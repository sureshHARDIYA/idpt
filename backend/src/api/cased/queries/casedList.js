const CasedService = require('../../../services/casedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  casedList(filter: CasedFilterInput, limit: Int, offset: Int, orderBy: CasedOrderByEnum): CasedPage!
`;

const resolver = {
  casedList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.casedRead);

    return new CasedService(context).findAndCountAll({
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
