const BioAnalyzedService = require('../../../services/bioAnalyzedService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  bioAnalyzedList(filter: BioAnalyzedFilterInput, limit: Int, offset: Int, orderBy: BioAnalyzedOrderByEnum): BioAnalyzedPage!
`;

const resolver = {
  bioAnalyzedList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioAnalyzedRead);

    return new BioAnalyzedService(context).findAndCountAll({
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
