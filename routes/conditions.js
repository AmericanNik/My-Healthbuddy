const express = require('express');

const {
  getConditions,
  getCondition,
  addCondition
} = require('../controllers/conditions');

const Condition = require('../models/Condition');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    protect,
    authorize('standard', 'premium', 'admin'),
    advancedResults(Condition, {
      path: 'healthbuddy',
      select: 'name description'
    }),
    protect,
    getConditions
  )
  .post(protect, authorize('standard', 'premium', 'admin'), addCondition);

router.route('/:id').get(getCondition);

module.exports = router;
