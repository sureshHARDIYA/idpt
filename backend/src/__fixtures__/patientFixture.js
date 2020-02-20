const genericFixture = require('./genericFixture');
const PatientRepository = require('../database/repositories/patientRepository');

const patientFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new PatientRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = patientFixture;
