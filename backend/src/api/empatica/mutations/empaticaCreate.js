const EmpaticaService = require('../../../services/empaticaService');
const BioAnalyzedService = require('../../../services/bioAnalyzedService');
const Analysis = require('../../../analysis/analysis');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  empaticaCreate(data: EmpaticaInput!): Empatica!
`;

const resolver = {
  empaticaCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.empaticaCreate);

    
    const storedData = await new EmpaticaService(context).create(
      args.data
    );

    // Anlysis and database storing of the raw wearable data
    const analyzedData = Analysis.analyze(storedData);
    new BioAnalyzedService(context).create(analyzedData);

    return storedData;
  },
};

exports.schema = schema;
exports.resolver = resolver;
