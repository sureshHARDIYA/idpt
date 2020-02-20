const TaskService = require('../../../services/taskService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  taskDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  taskDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.taskDestroy);

    await new TaskService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
