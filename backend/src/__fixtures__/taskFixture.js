const genericFixture = require('./genericFixture');
const TaskRepository = require('../database/repositories/taskRepository');

const taskFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new TaskRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = taskFixture;
