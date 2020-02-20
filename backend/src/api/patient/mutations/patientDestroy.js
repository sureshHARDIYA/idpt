const PatientService = require('../../../services/patientService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  patientDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  patientDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.patientDestroy);

    await new PatientService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
