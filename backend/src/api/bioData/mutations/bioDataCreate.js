const BioDataService = require('../../../services/bioDataService');
const BioAnalyzedService = require('../../../services/bioAnalyzedService');
const Analysis = require('../../../analysis/analysis');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bioDataCreate(data: BioDataInput!): BioData!
`;

const resolver = {
  bioDataCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bioDataCreate);

    console.log(args.data[0].dataType);
    console.log(args.data[1].dataType);

    /*const storedData = await new BioDataService(context).create(
      args.data
    );

    // Analysis and database storing of the raw wearable data
    const analyzedData = Analysis.analyze(storedData);
    new BioAnalyzedService(context).create(analyzedData);

    return storedData;*/

    // Analysis of the raw wearable data
    const analyzedData = Analysis.analyze(storedData);
    new BioAnalyzedService(context).create(analyzedData);

    // TODO
    //new BioAnalyzedService(context).createFromBioData(storedData);

    return storedData;

  },
};

exports.schema = schema;
exports.resolver = resolver;
