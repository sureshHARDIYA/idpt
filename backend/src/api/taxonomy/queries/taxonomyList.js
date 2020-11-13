const TaxonomyService = require('../../../services/taxonomyService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  taxonomyList(filter: TaxonomyFilterInput, limit: Int, offset: Int, orderBy: TaxonomyOrderByEnum): TaxonomyPage!
`;

const resolver = {
  taxonomyList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.taxonomyRead);

    return new TaxonomyService(context).findAndCountAll({
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
