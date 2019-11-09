const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  eventName: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },

  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'professional'
  }
});

module.exports = mongoose.model('event', EventSchema);
