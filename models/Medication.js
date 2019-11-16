const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  medName: {
    type: String,
    required: [true, 'Please add a med name'],
    maxLength: [50, 'Medication name cannot be longer than 50 characters']
  },
  medPurpose: {
    type: String,
    maxLength: [200, 'Med purpose can contain up to 200 characters']
  },
  perscribed: {
    type: Boolean
  },
  logData: {
    type: Object
  }
});

module.exports = mongoose.model('Medication', MedicationSchema);
