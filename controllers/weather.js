const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Weather = require('../models/Weather');
const Healthbuddy = require('../models/Healthbuddy');

exports.addWeather = asyncHandler(async (req, res, next) => {
    req.body.healthbuddy = req.params.healthbuddyId;
    req.body.user = req.user.id;

    const healthbuddy = await Healthbuddy.findByID(req.params.healthbuddyId);

    console.log("Creating Weather Information for Database");
    if (!healthbuddy) {
        return next(
            new ErrorResponse(
                `No HealthBuddy with the ID of ${req.params.healthbuddyId}`,
                404
            )
        );
    }
    const weather = await Weather.create(req.body);
    res.status(201).json({
        success: true,
        data: weather
    });
});

exports.getWeather = asyncHandler(async (req, res, next) => {
    const weather = await Weather.findById(req.params.id).populate({
        path: "healthbuddy",
        select: "name description"
    });
    console.log("Getting Weather Information");
    if (!weather) {
        return next(
            new ErrorResponse(
                `No Weather with ID of ${req.params.id} found`,
                404
            )
        );
    }
    res.status(200).json({
        success: true,
        data: weather
    });
});