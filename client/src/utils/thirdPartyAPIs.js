import axios from "axios";
import { addWeather } from "../../../controllers/weather";
const router = require("../../../controllers/weather");

export default thirdPartyAPI({
    getWeather: function () {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.weatherAPIKey}&zip=${zipCode}`)
            .then(function (response) {
                let weather = {
                    temperature = Math.floor(response.main.temp / 10),
                    humidity = Math.floor(response.main.humidity / 10)
                }
                console.log(weather);
            })
            .then(function (res) {
                addWeather(res);
            })
    },

    getZipCode: function () {
        return axios.get(`https://www.zipcodeapi.com/rest/${process.env.zipCodeAPIKey}/city-zips.json/${city}/${state}`)
            .then(function (response) {
                console.log(response.zip_codes[0]);
                let zipCode = response.zip_codes[0];
                console.log(zipCode)
            })
    },

    getZipCodeAndWeather: function () {
        return axios.get(`https://www.zipcodeapi.com/rest/${process.env.zipCodeAPIKey}/city-zips.json/${city}/${state}`)
            .then(function (response) {
                console.log(response.zip_codes[0]);
                let zipCode = response.zip_codes[0];
            }).then(function (res) {
                getWeather(res);
            }).then(function (res2) {
                addWeather(res2);
            })
    }


});
