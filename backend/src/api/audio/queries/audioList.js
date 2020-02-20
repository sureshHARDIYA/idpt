const AudioService = require('../../../services/audioService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  audioList(filter: AudioFilterInput, limit: Int, offset: Int, orderBy: AudioOrderByEnum): AudioPage!
`;

const resolver = {
  audioList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.audioRead);

    return new AudioService(context).findAndCountAll({
      ...args,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
