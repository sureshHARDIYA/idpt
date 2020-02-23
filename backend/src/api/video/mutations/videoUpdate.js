const VideoService = require('../../../services/videoService')
const permissions = require('../../../security/permissions').values
const PermissionChecker = require('../../../services/iam/permissionChecker')

const schema = `
  videoUpdate(id: String!, data: VideoInput!): Video!
`

const resolver = {
  videoUpdate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(permissions.videoEdit)

    return new VideoService(context).update(args.id, args.data)
  }
}

exports.schema = schema
exports.resolver = resolver
