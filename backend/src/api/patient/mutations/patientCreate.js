const PatientService = require('../../../services/patientService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  patientCreate(data: PatientInput!): Patient!
`;

const resolver = {
  patientCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.patientCreate);

    return new PatientService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
