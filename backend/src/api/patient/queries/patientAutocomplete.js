const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const PatientService = require('../../../services/patientService');

const schema = `
  patientAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  patientAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.patientAutocomplete);

    return new PatientService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
