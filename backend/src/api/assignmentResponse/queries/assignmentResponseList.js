const assignmentResponseService = require(
  '../../../services/assignmentResponseService'
)
const PermissionChecker = require('../../../services/iam/permissionChecker')
const permissions = require('../../../security/permissions').values
const graphqlSelectRequestedAttributes = require(
  '../../shared/utils/graphqlSelectRequestedAttributes'
)

const schema = `
  assignmentResponseList(limit: Int, offset: Int, orderBy: AssignmentsOrderByEnum): AssignmentsPage!
`

const resolver = {
  assignmentResponseList: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(permissions.casedRead)

    return new assignmentResponseService(
      context
    ).findAndCountAll({ ...args, requestedAttributes: graphqlSelectRequestedAttributes(info, 'rows') })
  }
}

exports.schema = schema
exports.resolver = resolver
