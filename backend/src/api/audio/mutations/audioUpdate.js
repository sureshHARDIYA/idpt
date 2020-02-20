const AudioService = require('../../../services/audioService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  audioUpdate(id: String!, data: AudioInput!): Audio!
`;

const resolver = {
  audioUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.audioEdit);

    return new AudioService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
