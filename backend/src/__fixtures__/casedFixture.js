const genericFixture = require('./genericFixture');
const CasedRepository = require('../database/repositories/casedRepository');

const casedFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new CasedRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = casedFixture;
