const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
  condition: {
    type: String,
    required: [true, 'Please enter name of condition/concern'],
    maxlength: [50, 'Names can be up to 50 characters']
  },
  conditionSymptoms: {
    type: [String],
    maxLength: [500, 'Symptom logs can contain up to 500 characters']
  },
  conditionFeeling: {
    type: Number,
    max: 10,
    min: 1
  },
  mostNoticed: {
    type: [String],
    enum: ['Morning', 'Afternoon', 'Evening', 'All-Day']
  },
  healthbuddy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Healthbuddy',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

//prevent standard user from submitting more than 3 conditions per healthbuddy

ConditionSchema.index({ healthbuddy: 1, standard: 3 }, { unique: true });

module.exports = mongoose.model('Condition', ConditionSchema);
