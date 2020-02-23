const VideoService = require('../../../services/videoService')
const PermissionChecker = require('../../../services/iam/permissionChecker')
const permissions = require('../../../security/permissions').values
const graphqlSelectRequestedAttributes = require(
  '../../shared/utils/graphqlSelectRequestedAttributes'
)

const schema = `
  videoList(filter: VideoFilterInput, limit: Int, offset: Int, orderBy: VideoOrderByEnum): VideoPage!
`

const resolver = {
  videoList: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(permissions.videoRead)

    return new VideoService(
      context
    ).findAndCountAll({ ...args, requestedAttributes: graphqlSelectRequestedAttributes(info, 'rows') })
  }
}

exports.schema = schema
exports.resolver = resolver
