const PatientService = require('../../../services/patientService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  patientImport(data: PatientInput!, importHash: String!): Boolean
`;

const resolver = {
  patientImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.patientImport);

    await new PatientService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
