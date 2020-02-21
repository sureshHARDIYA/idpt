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
    new PermissionChecker(context)
      .validateHas(permissions.recordRead);

    return new RecordService(context).findAndCountAll({
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
