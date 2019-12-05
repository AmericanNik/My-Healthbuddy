const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
  condition: {
    type: String
  },
  conditionSymptoms: {
    type: String
  }
});

module.exports = mongoose.model('Condition', ConditionSchema);
