const PatientService = require('../../../services/patientService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  patientFind(id: String!): Patient!
`;

const resolver = {
  patientFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.patientRead);

    return new PatientService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
