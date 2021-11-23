const EmpaticaService = require('../../../services/empaticaService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  empaticaList(filter: EmpaticaFilterInput, limit: Int, offset: Int, orderBy: EmpaticaOrderByEnum): EmpaticaPage!
`;

const resolver = {
  empaticaList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.empaticaRead);

    return new EmpaticaService(context).findAndCountAll({
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
