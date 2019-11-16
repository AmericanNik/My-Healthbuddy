const express = require('express');

const {
  getHealthbuddies,
  getHealthbuddy,
  createHealthbuddy,
  updateHealthbuddy,
  deleteHealthbuddy
} = require('../controllers/healthbuddies');

const Healthbuddy = require('../models/Healthbuddy');

const advancedResults = require('../middleware/advancedResults');

//Include other resource routers
const logRouter = require('./logs');
const conditionRouter = require('./conditions');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers

router.use('/:healthbuddyId/logs', logRouter);
router.use('/:healthbuddyId/conditions', conditionRouter);

router
  .route('/')
  .get(
    advancedResults(Healthbuddy, 'logs'),
    protect,
    authorize('standard', 'premium', 'admin'),
    getHealthbuddies
  )
  .post(protect, authorize('standard', 'premium'), createHealthbuddy);

router
  .route('/:id')
  .get(protect, authorize('standard', 'premium'), getHealthbuddy)
  .put(protect, authorize('standard', 'premium'), updateHealthbuddy)
  .delete(protect, authorize('standard', 'premium'), deleteHealthbuddy);
module.exports = router;
