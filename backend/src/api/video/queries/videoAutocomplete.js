const PermissionChecker = require('../../../services/iam/permissionChecker')
const permissions = require('../../../security/permissions').values
const VideoService = require('../../../services/videoService')

const schema = `
  videoAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`

const resolver = {
  videoAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(permissions.videoAutocomplete)

    return new VideoService(
      context
    ).findAllAutocomplete(args.query, args.limit)
  }
}

exports.schema = schema
exports.resolver = resolver
