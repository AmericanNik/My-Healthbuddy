const mongoose = require('mongoose');

const InviteSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    unique: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('invite', InviteSchema);
