const RecordService = require('../../../services/recordService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  recordList(filter: RecordFilterInput, limit: Int, offset: Int, orderBy: RecordOrderByEnum): RecordPage!
`;

const resolver = {
  recordList: async (root, args, context, info) => {
    const defaultArgs = {
      filter: { availableFromRange: [], createdAtRange: [] },
      limit: 10,
      offset: 0,
      orderBy: null,
      ...args
    };

    if (!(root && root.id)) {
      new PermissionChecker(context)
        .validateHas(permissions.recordRead);
    } else {
      defaultArgs.filter = {
        ...(defaultArgs.filter || {}),
        patient: root.id,
      }
    }

    return new RecordService(context).findAndCountAll({
      ...defaultArgs,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
