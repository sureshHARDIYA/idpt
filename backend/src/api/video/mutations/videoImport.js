const VideoService = require('../../../services/videoService')
const PermissionChecker = require('../../../services/iam/permissionChecker')
const permissions = require('../../../security/permissions').values

const schema = `
  videoImport(data: VideoInput!, importHash: String!): Boolean
`

const resolver = {
  videoImport: async (root, args, context) => {
    new PermissionChecker(context).validateHas(permissions.videoImport)

    await new VideoService(context).import(args.data, args.importHash)

    return true
  }
}

exports.schema = schema
exports.resolver = resolver
