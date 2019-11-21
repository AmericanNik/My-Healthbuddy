const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Scheme({
    tempKelvin: {
        type: Number
    },
    humidity: {
        type: Number
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

})

module.exports = mongoose.model("Weather", WeatherSchema);