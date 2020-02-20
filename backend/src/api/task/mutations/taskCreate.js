const TaskService = require('../../../services/taskService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  taskCreate(data: TaskInput!): Task!
`;

const resolver = {
  taskCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.taskCreate);

    return new TaskService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
