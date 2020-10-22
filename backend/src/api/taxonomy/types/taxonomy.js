const TaxonomyService = require('../../../services/taxonomyService');

const schema = `
  type Taxonomy {
    id: String!
    parent: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {
  Task: {
    id: (instance) => instance.id || instance._id,

    next: (task, _, context) => {
      if (task.next && task.next[0] && !task.next[0].name) {
        return new TaskService(context).findByIds(
          task.next,
        );
      }

      return task.next;
    },
  },
};

exports.schema = schema;
exports.resolver = resolver;
