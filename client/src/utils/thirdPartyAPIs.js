import axios from "axios";

export default thirdPartyAPI({
    getWeather = () => {
        let weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.weatherAPIKey}&q=${zipCode}`
        $.ajax({
            url: weatherAPIURL,
            method: 'GET'
        }).then(function (response) {
            let weather = {
                temperature = response.main.temp,
                humidity = response.main.humidity
            }
            console.log(weather);
        })
    },

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
    },

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
    }


});
