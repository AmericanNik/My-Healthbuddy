const express = require('express');

const { getAtmosphere, getZipcode } = require('../controllers/dataCall');

const Log = require('../models/Log');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/atmosphere/:lat?/:long?').get(getAtmosphere);

router.route('/zipcode/:zipcode?').get(getZipcode);

module.exports = router;
