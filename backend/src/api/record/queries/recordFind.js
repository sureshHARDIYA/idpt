const RecordService = require('../../../services/recordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  recordFind(id: String!, options: RoadmapOption): Record!
`;

const resolver = {
  recordFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.recordRead);

    return new RecordService(context).findById(args.id, args.options);
  },
};

exports.schema = schema;
exports.resolver = resolver;
