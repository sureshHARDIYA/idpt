const genericFixture = require('./genericFixture');
const AudioRepository = require('../database/repositories/audioRepository');

const audioFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new AudioRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = audioFixture;
