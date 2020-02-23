const VideoService = require('../../../services/videoService')
const PermissionChecker = require('../../../services/iam/permissionChecker')
const permissions = require('../../../security/permissions').values

const schema = `
  videoCreate(data: VideoInput!): Video!
`

const resolver = {
  videoCreate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(permissions.videoCreate)
    return new VideoService(context).create(args.data)
  }
}

exports.schema = schema
exports.resolver = resolver
