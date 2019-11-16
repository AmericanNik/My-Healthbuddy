const mongoose = require('mongoose');

const NutrientSchema = new mongoose.Schema({
  nutrientName: {
    type: String,
    required: true,
    maxLength: [50, 'Nutrient name cannot be longer than 50 characters']
  },
  nutrientPurpose: {
    type: String,
    maxLength: [200, 'Med purpose can contain up to 200 characters']
  },
  perscribed: {
    type: Boolean
  },
  logData: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('Nutrient', NutrientSchema);
