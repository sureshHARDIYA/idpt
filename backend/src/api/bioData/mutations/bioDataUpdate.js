const BioDataService = require('../../../services/bioDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioDataUpdate(id: String!, data: BioDataInput!): BioData!
`;

const resolver = {
  bioDataUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioDataEdit);

    return new BioDataService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
