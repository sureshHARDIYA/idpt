const AssignmentService = require('../../../services/assignmentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  assignmentsFind(id: String!): Assignment!
`;

const resolver = {
  assignmentsFind: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.casedRead,
    );

    return new AssignmentService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
