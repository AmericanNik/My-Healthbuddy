const express = require("express");

const {
    getWeather,
    addWeather
} = require("../controllers/weather");

const Weather = require("../models/Weather");
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
    .route("/")
    .get(
        protect,
        authorize("standard", "premium", "admin"),
        advancedResults(Weather, {
            path: "healthbuddy",
            select: "name description"
        }),
        protect,
        getWeather
    ).post(protect, authorize("standard", "premium", "admin"), addWeather);
router.route(":id").getWeather();

module.exports = router;