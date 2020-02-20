const PatientService = require('../../../services/patientService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  patientList(filter: PatientFilterInput, limit: Int, offset: Int, orderBy: PatientOrderByEnum): PatientPage!
`;

const resolver = {
  patientList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.patientRead);

    return new PatientService(context).findAndCountAll({
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
