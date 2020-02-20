const TaskService = require('../../../services/taskService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  taskUpdate(id: String!, data: TaskInput!): Task!
`;

const resolver = {
  taskUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.taskEdit);

    return new TaskService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
