const express = require('express');
const request = require('request');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

exports.getAtmosphere = asyncHandler(async (req, res, next) => {
  const lat = req.params.lat;
  const long = req.params.long;

  request(
    {
      url: `https://api.darksky.net/forecast/9602ab6d200c5c4f85c2c9e82c8c5e5c/${lat},${long}`
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log(error, response, body);
        return res.status(500).json({ type: 'error', message: body.error });
      }
      res.json(JSON.parse(body));
    }
  );
  console.log('route hit');
});

exports.getZipcode = asyncHandler(async (req, res, next) => {
  const zipcode = req.params.zipcode;

  request(
    {
      url: `https://www.zipcodeapi.com/rest/j1Z2v9Je4bxMeBYJ2CcXLTAiTthfgamGGXxpzjt1GRl477v2MLBJ2YgqtjC2TjPE/info.json/${zipcode}/degrees`
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log(error, response, body);
        return res.status(500).json({ type: 'error', message: body.error });
      }
      res.json(JSON.parse(body));
    }
  );
});
