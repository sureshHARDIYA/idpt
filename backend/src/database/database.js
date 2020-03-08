const mongoose = require('mongoose');

mongoose.stateEntry = {
  type: String,
  enum: [
    "LOCKED",
    "ACTIVATE",
    "PROGRESS",
    "COMPLETE"
  ],
  default: 'LOCKED',
}

module.exports = mongoose;
