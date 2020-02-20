const AudioService = require('../../../services/audioService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  audioFind(id: String!): Audio!
`;

const resolver = {
  audioFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.audioRead);

    return new AudioService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
