const EpicService = require('../../../services/epicService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  epicCriteriaUpdate(id: String!, data: [EpicCriteriaInput]!): Epic!
`;

const resolver = {
  epicCriteriaUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.epicCriteriaUpdate);

    return new EpicService(context).epicCriteriaUpdate(
      args.id,
      args.data
    )
  },
};

exports.schema = schema;
exports.resolver = resolver;
