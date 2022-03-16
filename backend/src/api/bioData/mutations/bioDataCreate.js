const BioDataService = require('../../../services/bioDataService');
const BioAnalyzedService = require('../../../services/bioAnalyzedService');
const Analysis = require('../../../analysis/analysis');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioDataCreate(data: MultipleBioDataInput!): [BioData!]
`;

const resolver = {
  bioDataCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioDataCreate);

    const storedBioDatas = [];

    for (const bioData of args.data.datas) {
      storedBioDatas.push(await new BioDataService(context).create(bioData));
    }

    // Analysis and database storing of the raw wearable data
    const analyzedData = Analysis.analyze(storedBioDatas);
    new BioAnalyzedService(context).create(analyzedData);

    return storedBioDatas;

    /*
    TODO: Using a separate function for creating bot raw and analyzed data

    // Analysis of the raw wearable data
    const analyzedData = Analysis.analyze(storedData);
    new BioAnalyzedService(context).create(analyzedData);

    //new BioAnalyzedService(context).createFromBioData(storedData);

    return storedData;
    */

  },
};

exports.schema = schema;
exports.resolver = resolver;
