const mongoose = require('mongoose');
const slugify = require('slugify');

const HealthbuddySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please give a name to your Healthbuddy'],
      trim: true,
      maxLength: [50, 'Name cannot be more than 50 characters.']
    },
    overallWellbeing: {
      type: Number,
      min: 1,
      max: 10
    },
    sevenDayAverage: {
      type: Number,
      min: 1,
      max: 10
    },
    slug: String,

    medications: [Object],
    nutrients: [Object],
    buddyPhoto: {
      type: String,
      default: 'no-photo.jpg'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    healthbuddyLogs: {
      type: mongoose.Schema.ObjectId,
      ref: 'Log'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Cascade delete logs when a healthbuddy is deleted.
HealthbuddySchema.pre('remove', async function(next) {
  console.log(`Logs being removed from healthbuddy ${this._id}`);
  await this.model('Log').deleteMany({ healthbuddy: this._id });
  next();
});

//  Reverse populate logs  with virtuals
// HealthbuddySchema.virtual('Logs', {
//   ref: 'Log',
//   localField: '_id',
//   foreignField: 'healthbuddy',
//   justOne: false
// });

//reverse populate Medications with virtuals

// HealthbuddySchema.virtual('conditions', {
//   ref: 'Condition',
//   localField: '_id',
//   foreignField: 'healthbuddy',
//   justOne: false
// });

//reverse populate nutrients with virtuals
HealthbuddySchema.virtual('Log', {
  ref: 'Log',
  localField: '_id',
  foreignField: 'healthbuddy',
  justOne: false
});

HealthbuddySchema.virtual('Condition', {
  ref: 'Condition',
  localField: '_id',
  foreignField: 'healthbuddy',
  justOne: false
});

//Pre-save Healthbuddy functions

HealthbuddySchema.pre('save', function(next) {
  // Create healthbuddy slug from the name
  this.slug = slugify(this.name, { lower: true });

  //calculates and sets overall average wellbeing

  // arr = [];
  // console.log(this);

  // this.logs.forEach(element => {
  //   arr.push(element.logData.dailyWellbeing);
  // });

  // const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  // arrAvg(arr);
  // avg = arrAvg(arr).toFixed(2);

  // this.overallWellbeing = avg;

  next();
});

module.exports = mongoose.model('Healthbuddy', HealthbuddySchema);
