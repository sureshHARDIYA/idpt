const RecordService = require('../../../services/recordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  recordFind(id: String!, options: RoadmapOption): Record!
`;

const resolver = {
  recordFind: async (root, args, context) => {
    const record = await new RecordService(context).findById(args.id, args.options);

    if (!context.currentUser.patient || record.owner.id.toString() !== context.currentUser.patient.toString()) {
      new PermissionChecker(context)
        .validateHas(permissions.recordRead);
    }

    return record;
  },
};

exports.schema = schema;
exports.resolver = resolver;
