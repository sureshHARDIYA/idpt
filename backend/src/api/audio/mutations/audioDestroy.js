const AudioService = require('../../../services/audioService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  audioDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  audioDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.audioDestroy);

    await new AudioService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
