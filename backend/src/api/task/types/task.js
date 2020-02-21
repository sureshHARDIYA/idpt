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
    type: TaskTypeEnum
    owner: [ Module! ]
    elements: [ Document! ]
    next: [Task]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {
  Task: {
    next: (task, _, context) => {
      if (task.next && task.next[0] && !task.next[0].name) {
        return new TaskService(context).findByIds(task.next);
      }

      return task.next;
    }
  }
};

exports.schema = schema;
exports.resolver = resolver;
