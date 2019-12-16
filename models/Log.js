const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  logDate: {
    type: Number,
    required: true
  },
  journalEntry: {
    type: String,
    maxLength: [500, 'Logs can contain up to 500 characters']
  },
  conditions: {
    type: [Object]
  },
  dailyWellbeing: {
    type: Number,
    required: true,
    max: 10,
    min: 1
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
  },
  currentSummary: {
    type: String
  },
  dailyActivity: {
    type: Number
  },
  dailySummary: {
    type: String
  },
  dewPoint: Number,
  humidity: Number,
  latitude: Number,
  longitude: Number,
  moonPhase: Number,
  ozone: Number,
  pressure: Number,
  temperature: Number,
  windSpeed: Number
});

//  Static method to get average wellbeing
LogSchema.statics.getAverageWellbeing = async function(healthbuddyId) {
  console.log('Calculating average wellbeing<3'.brightBlue);

  const obj = await this.aggregate([
    {
      $match: { healthbuddy: healthbuddyId }
    },
    {
      $group: {
        _id: '$healthbuddy',
        averageWellbeing: { $avg: '$dailyWellbeing' }
      }
    }
  ]);

  try {
    await this.model('Healthbuddy').findByIdAndUpdate(healthbuddyId, {
      overallWellbeing: obj[0].averageWellbeing.toFixed(2)
    });
    console.log('trying 2');
  } catch (err) {
    console.log(err);
  }
};

// Call getAverageWellbeing after save

LogSchema.post('save', function() {
  this.constructor.getAverageWellbeing(this.healthbuddy);
});

//  Call before remove

LogSchema.pre('remove', function() {
  this.constructor.getAverageWellbeing(this.healthbuddy);
});

module.exports = mongoose.model('Log', LogSchema);
