const permissions = require('../../../security/permissions')
  .values;
const AssignmentService = require('../../../services/assignmentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');

const schema = `
  assignmentsDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  assignmentsDestroy: async (root, args, context) => {
    // DO-NEXT: update permissions
    // new PermissionChecker(context).validateHas(
    //   permissions.casedDestroy,
    // );

    await new AssignmentService(context).destroyAll(
      args.ids,
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
