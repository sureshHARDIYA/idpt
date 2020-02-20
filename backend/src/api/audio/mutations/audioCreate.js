const AudioService = require('../../../services/audioService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  audioCreate(data: AudioInput!): Audio!
`;

const resolver = {
  audioCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.audioCreate);

    return new AudioService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
