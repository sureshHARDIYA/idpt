const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const TaskService = require('../../../services/taskService');

const schema = `
  taskAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  taskAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.taskAutocomplete);

    return new TaskService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
