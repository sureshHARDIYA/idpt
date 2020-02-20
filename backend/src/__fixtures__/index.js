const userFixture = require('./userFixture');
const patientFixture = require('./patientFixture');
const casedFixture = require('./casedFixture');
const moduleFixture = require('./moduleFixture');
const taskFixture = require('./taskFixture');
const audioFixture = require('./audioFixture');
const documentFixture = require('./documentFixture');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = {
  user: userFixture,
  patient: patientFixture,
  cased: casedFixture,
  module: moduleFixture,
  task: taskFixture,
  audio: audioFixture,
  document: documentFixture,

  async cleanDatabase() {
    await AbstractRepository.cleanDatabase();
  },
};
