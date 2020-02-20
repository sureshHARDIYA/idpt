const PatientService = require('../../../services/patientService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  patientUpdate(id: String!, data: PatientInput!): Patient!
`;

const resolver = {
  patientUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.patientEdit);

    return new PatientService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
