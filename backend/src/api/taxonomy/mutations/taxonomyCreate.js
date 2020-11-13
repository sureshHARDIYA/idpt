const TaxonomyService = require('../../../services/taxonomyService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  taxonomyCreate(data: TaxonomyInput!): Taxonomy!
`;

const resolver = {
  taxonomyCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.taxonomyCreate);

    return new TaxonomyService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
