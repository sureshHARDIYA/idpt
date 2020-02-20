const genericFixture = require('./genericFixture');
const ModuleRepository = require('../database/repositories/moduleRepository');

const moduleFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new ModuleRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = moduleFixture;
