const AssignmentService = require('../../../services/assignmentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  assignmentUpdate(id: String!, data: AssignmentInput!): Assignment!
`;

const resolver = {
  assignmentUpdate: async (root, args, context) => {
    // DO-NEXT: update permissions
    // new PermissionChecker(context)
    //   .validateHas(permissions.audioEdit);

    return new AssignmentService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
