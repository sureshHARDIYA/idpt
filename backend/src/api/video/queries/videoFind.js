const VideoService = require('../../../services/videoService')
const permissions = require('../../../security/permissions').values
const PermissionChecker = require('../../../services/iam/permissionChecker')

const schema = `
  videoFind(id: String!): Video!
`

const resolver = {
  videoFind: async (root, args, context) => {
    new PermissionChecker(context).validateHas(permissions.videoRead)

    return new VideoService(context).findById(args.id)
  }
}

exports.schema = schema
exports.resolver = resolver
