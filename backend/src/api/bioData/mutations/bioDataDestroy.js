const BioDataService = require('../../../services/bioDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioDataDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  bioDataDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioDataDestroy);

    await new BioDataService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
