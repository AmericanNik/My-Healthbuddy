const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Condition = require('../models/Condition');
const Healthbuddy = require('../models/Healthbuddy');

//@desc     Get conditions
//@route    GET /api/v1/conditions
//@route    GET/api/v1/healbuddis/:healthbuddyId/conditions
//@access   Private

exports.getConditions = asyncHandler(async (req, res, next) => {
  if (req.params.healthbuddyId) {
    const conditions = await Condition.find({
      healthbuddy: req.params.healthbuddyId
    });

    return res.status(200).json(res.advancedResults);
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc     Get a single condition
//@route    GET /api/v1/conditions/:id
//@access   Private

exports.getCondition = asyncHandler(async (req, res, next) => {
  const condition = await Condition.findById(req.params.id).populate({
    path: 'healthbuddy',
    select: 'name description'
  });

  console.log('Firing!@');
  if (!condition) {
    return next(
      new ErrorResponse(
        `No condition found with the ID of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: condition });
});

//@desc     Get a condition
//@route    POST /api/v1/healthbuddies/:healthbuddyId/condition
//@access   Private

exports.addCondition = asyncHandler(async (req, res, next) => {
  req.body.healthbuddy = req.params.healthbuddyId;
  req.body.user = req.user.id;

  const healthbuddy = await Healthbuddy.findById(req.params.healthbuddyId);

  if (!healthbuddy) {
    return next(
      new ErrorResponse(
        `No healthbuddy with id of ${req.params.healthbuddyId}`,
        404
      )
    );
  }

  const condition = await Condition.create(req.body);

  res.status(201).json({ success: true, data: condition });
});
