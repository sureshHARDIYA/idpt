const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const AssignmentService = require('../../../services/assignmentService');

const schema = `
  assignmentsAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  assignmentsAutocomplete: async (
    root,
    args,
    context,
    info,
  ) => {
    new PermissionChecker(context).validateHas(
      permissions.casedAutocomplete,
    );

    return new AssignmentService(
      context,
    ).findAllAutocomplete(args.query, args.limit);
  },
};

exports.schema = schema;
exports.resolver = resolver;
