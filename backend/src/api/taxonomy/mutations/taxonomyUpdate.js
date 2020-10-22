const TaxonomyService = require('../../../services/taxonomyService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  taxonomyUpdate(id: String!, data: TaxonomyInput!): Taxonomy!
`;

const resolver = {
  taxonomyUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.taskEdit);

    return new TaxonomyService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
