const RoadmapService = require('../../../services/roadmapService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  roadmapList(filter: AudioFilterInput, limit: Int, offset: Int, orderBy: AudioOrderByEnum): AudioPage!
`;

const resolver = {
  roadmapList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordRead);

    return new RoadmapService(context).findAndCountAll({
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
