const express = require('express');

const {
  getConditions,
  getCondition,
  addCondition,
  searchCondition
} = require('../controllers/conditions');

const Condition = require('../models/Condition');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Condition, {
      path: 'healthbuddy',
      select: 'name description'
    }),
    getConditions
  )

  .post(protect, authorize('standard', 'premium', 'admin'), addCondition);

router.route('/:id').get(getCondition);

router.route('/search/:condition').get(searchCondition);

module.exports = router;
