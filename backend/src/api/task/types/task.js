const TaskService = require('../../../services/taskService');

const schema = `
  type Task {
    id: String!
    name: String
    description: String
    status: TaskStatusEnum
    tags: String
    points: Int
    completionRequired: Boolean
    complexityLevel: Int
    owner: [ Module! ]
    assignments: [Assignment]
    elements: [Element]
    documents: [Document]
    audios: [Audio]
    videos: [Video]
    next: [Task]
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
