const Service = require('../../../services/roadmapService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  roadmapFind(id: String!): Roadmap!
`;

const resolver = {
  roadmapFind: async (root, args, context) => {
    const record = await new Service(context).findById(args.id);

    if (!context.currentUser.patient || record.record.owner._id.toString() !== context.currentUser.patient.toString()) {
      new PermissionChecker(context)
        .validateHas(permissions.recordRead);
    }

    return record;
  },
};

exports.schema = schema;
exports.resolver = resolver;
