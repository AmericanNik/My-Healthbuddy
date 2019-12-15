const express = require('express');

const {
  getLog,
  getLogs,
  addLog,
  updateLog,
  deleteLog
} = require('../controllers/logs');

const Log = require('../models/Log');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    protect,
    authorize('standard', 'premium', 'admin'),
    advancedResults(Log, {
      path: 'healthbuddy',
      select: 'name description'
    }),
    protect,
    getLogs
  )
  .post(protect, authorize('standard', 'premium', 'admin'), addLog);

router
  .route('/:id')
  .get(protect, authorize('standard', 'premium', 'admin'), getLog)
  .put(protect, authorize('standard', 'premium', 'admin'), updateLog)
  .delete(protect, authorize('standard', 'premium', 'admin'), deleteLog);

module.exports = router;
