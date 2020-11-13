const TaxonomyService = require('../../../services/taxonomyService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  taxonomyFind(id: String!): Taxonomy!
`;

const resolver = {
  taxonomyFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.taxonomyRead);

    return new TaxonomyService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
