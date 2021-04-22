const AssignmentResponseService = require(
  '../../../services/assignmentResponseService'
)
const PermissionChecker = require('../../../services/iam/permissionChecker')
const permissions = require('../../../security/permissions').values

const schema = `
  assignmentResponseCreate(data: assignmentResponseInput!): AssignmentResponse!
`

const resolver = {
  assignmentCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(permissions.casedCreate)

    return new AssignmentResponseService(context).create(args.data)
  }
}

exports.schema = schema
exports.resolver = resolver
