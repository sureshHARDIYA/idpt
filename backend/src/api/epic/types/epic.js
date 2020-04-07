const _get = require('lodash/get');

const schema = `
  type Epic {
    id: String!
    host: Task!
    roadmap: Roadmap
    state: StateEnum!
    completionRequired: Boolean
    children: [Epic]
    elements: [EpicEvaluationCriteria]

    createdAt: DateTime
    updatedAt: DateTime
  }

  type EpicEvaluationCriteria {
    id: ID
    total: Int
    done: Boolean
    evaluation: Int
    content: String
    resourceType: String
    operator: EvaluationCriteriaoperator
  }
`;

const resolver = {
  EpicEvaluationCriteria: {
    id: (instance) => instance.resourceId
  },
  Epic: {
    id: (instance) => instance.id || instance._id,
    host: (instance) => {
      const task = instance.task;
      const elements = (instance.elements || []).reduce((obj, item) => ({
        ...obj,
        [item.id]: item
      }), {});

      const taskElements = task.elements.map(element => {
        const item = elements[_get(element, 'evaluationCriteria._id')];

        if (item) {
          return ({
            ...element.toJSON(),
            evaluationCriteria: {
              ...element.evaluationCriteria.toJSON(),
              id: item.id,
              done: item.done,
              total: item.total,
            }
          })
        }

        return element;
      });

      return {
        ...task.toJSON(),
        elements: taskElements
      }
    },
    children: (instance) => instance.children && instance.children.length > 0 ? instance.children: null
  }
};

exports.schema = schema;
exports.resolver = resolver;
