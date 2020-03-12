const Service = require('../../../services/roadmapService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  roadmapFind(id: String!): Roadmap!
`;

const resolver = {
  roadmapFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordRead);

    const a = await new Service(context).findById(args.id);

    return a;
  },
};

exports.schema = schema;
exports.resolver = resolver;
