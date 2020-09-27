const AssignmentService = require('../../../services/assignmentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  assignmentCreate(data: AssignmentInput!): Assignment!
`;

const resolver = {
  assignmentCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.taskCreate,
    );

    return new AssignmentService(context).create(args.data);
  },
};

exports.schema = schema;
exports.resolver = resolver;
