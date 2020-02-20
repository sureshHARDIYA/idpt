const genericFixture = require('./genericFixture');
const DocumentRepository = require('../database/repositories/documentRepository');

const documentFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new DocumentRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = documentFixture;
