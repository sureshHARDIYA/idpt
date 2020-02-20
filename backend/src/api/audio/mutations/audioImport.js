const AudioService = require('../../../services/audioService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  audioImport(data: AudioInput!, importHash: String!): Boolean
`;

const resolver = {
  audioImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.audioImport);

    await new AudioService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
