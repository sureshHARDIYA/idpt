const mongoose = require('mongoose');

const schema = `
  type Record {
    id: String!
    host: Cased!
    owner: User!
    description: String
    state: StateEnum!
    status: StatusEnum
    ownerId: String
    roadmaps: [Roadmap!]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {
  Record: {
    ownerId: (instance) => {
      if (mongoose.Types.ObjectId.isValid(instance.owner)) {
        return instance.owner;
      }
      return instance.owner ? instance.owner._id : null;
    },
  },
};

exports.schema = schema;
exports.resolver = resolver;
