const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

//  Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the thunderdome' }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/events', require('./routes/events'));
app.use('/api/invite', require('./routes/invite'));


getZipCode = () => {
    let zipCodeAPIURL = `https://www.zipcodeapi.com/rest/${process.env.zipCodeAPIKey}/city-zips.json/${city}/${state}
    `
    $.ajax({
        url: zipCodeAPIURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.zip_codes[0]);
        let zipCode = response.zip_codes[0];
    })
};

getZipCodeAndWeather = () => {
    let zipCodeAPIURL = `https://www.zipcodeapi.com/rest/${process.env.zipCodeAPIKey}/city-zips.json/${city}/${state}
    `
    $.ajax({
        url: zipCodeAPIURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.zip_codes[0]);
        let zipCode = response.zip_codes[0];
    }).then(function (res) {
        getWeather();
    })
};


getWeather = () => {
    let weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.weatherAPIKey}&q=${zipCode}`
    $.ajax({
        url: weatherAPIURL,
        method: 'GET'
    }).then(function (response) {
        response.forEach(element => {
            console.log(element);
        });
    })
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
