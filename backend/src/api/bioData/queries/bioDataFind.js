const BioDataService = require('../../../services/bioDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioDataFind(id: String!): BioData!
`;

const resolver = {
  bioDataFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioDataRead);

    return new BioDataService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
