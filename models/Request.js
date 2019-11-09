const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
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
  duration: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('request', RequestSchema);
