const TaskService = require('../../../services/taskService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  taskFind(id: String!): Task!
`;

const resolver = {
  taskFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.taskRead);

    return new TaskService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
