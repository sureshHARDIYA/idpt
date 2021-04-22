const AssignmentsService = require('../../../services/assignmentService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  assignmentsList(filter: AssignmentsFilterInput, limit: Int, offset: Int, orderBy: AssignmentsOrderByEnum): AssignmentsPage!
`;

const resolver = {
  assignmentsList: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.casedRead,
    );

    return new AssignmentsService(context).findAndCountAll({
      ...args,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
