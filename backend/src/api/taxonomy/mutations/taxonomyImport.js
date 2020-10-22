const TaxonomyService = require('../../../services/taxonomyService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  taxonomyImport(data: TaxonomyInput!, importHash: String!): Boolean
`;

const resolver = {
  taxonomyImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.taxonomyImport);

    await new TaxonomyService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
