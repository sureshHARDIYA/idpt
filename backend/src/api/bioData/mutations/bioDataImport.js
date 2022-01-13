const BioDataService = require('../../../services/bioDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioDataImport(data: BioDataInput!, importHash: String!): Boolean
`;

const resolver = {
  bioDataImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioDataImport);

    await new BioDataService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
