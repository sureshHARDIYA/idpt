const TaskService = require('../../../services/taskService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  taskImport(data: TaskInput!, importHash: String!): Boolean
`;

const resolver = {
  taskImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.taskImport);

    await new TaskService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
