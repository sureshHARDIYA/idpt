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
    const defaultArgs = {
      filter: { availableFromRange: [], createdAtRange: [] },
      limit: 10,
      offset: 0,
      orderBy: null,
      ...args
    };

    if (!(root && root.id)) {
      new PermissionChecker(context)
        .validateHas(permissions.casedRead);
    } else {
      defaultArgs.filter = {
        ...(defaultArgs.filter || {}),
        patient: root.id,
      }
    }

    return new CasedService(context).findAndCountAll({
      ...defaultArgs,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
