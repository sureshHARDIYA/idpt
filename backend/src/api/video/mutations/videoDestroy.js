const VideoService = require('../../../services/videoService')
const permissions = require('../../../security/permissions').values
const PermissionChecker = require('../../../services/iam/permissionChecker')

const schema = `
  videoDestroy(ids: [String!]!): Boolean
`

const resolver = {
  videoDestroy: async (root, args, context) => {
    new PermissionChecker(context).validateHas(permissions.videoDestroy)

    await new VideoService(context).destroyAll(args.ids)

    return true
  }
}

exports.schema = schema
exports.resolver = resolver
