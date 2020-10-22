const TaxonomyService = require('../../../services/taxonomyService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  taxonomyDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  taxonomyDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.taxonomyDestroy);

    await new TaxonomyService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
