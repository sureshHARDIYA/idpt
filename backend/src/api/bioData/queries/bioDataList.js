const BioDataService = require('../../../services/bioDataService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  bioDataList(filter: BioDataFilterInput, limit: Int, offset: Int, orderBy: BioDataOrderByEnum): BioDataPage!
`;

const resolver = {
  bioDataList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioDataRead);

    return new BioDataService(context).findAndCountAll({
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
