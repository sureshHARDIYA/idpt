const WearableDataService = require('../../../services/wearableDataService');
const ScoredDataService = require('../../../services/scoredDataService');
const Analysis = require('../../../analysis/analysis');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  wearableDataCreate(data: MultipleWearableDataInput!): [WearableData!]
`;

const resolver = {
  wearableDataCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.wearableDataCreate);

    // console.log("BACKEND1 Wearable data create BACKEND1");
    const storedWearableDatas = [];

    for (const wearableData of args.data.datas) {
      storedWearableDatas.push(await new WearableDataService(context).create(wearableData));
    }

    // console.log("BACKEND2 Wearable data create BACKEND2 ");
    // console.log(storedWearableDatas);

    // Analysis and database storing of the raw wearable data
    const analyzedData = Analysis.analyze(storedWearableDatas);

    console.log()

    new ScoredDataService(context).create(analyzedData);

    return storedWearableDatas;

    /*
    TODO: Using a separate function for creating both raw and analyzed data

    // Analysis of the raw wearable data
    const analyzedData = Analysis.analyze(storedData);
    new ScoredDataService(context).create(analyzedData);

    //new ScoredDataService(context).createFromWearableData(storedData);

    return storedData;
    */

  },
};

exports.schema = schema;
exports.resolver = resolver;
