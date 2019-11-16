const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Healthbuddy = require('../models/Healthbuddy');

//@desc     Get all healthbuddies
//@route    GET /api/v1/healthbuddies
//@access   Private

exports.getHealthbuddies = asyncHandler(async (req, res, next) => {
  console.log('Get Healthbuddies Firing!');
  res.status(200).json(res.advancedResults);
});

//@desc     Get a single healthbuddy
//@route    GET /api/v1/healthbuddies/:id
//@access   Private

exports.getHealthbuddy = asyncHandler(async (req, res, next) => {
  console.log('getting single healthbuddy');
  const healthbuddy = await Healthbuddy.findById(req.params.id).populate([
    {
      path: 'Log',
      select: 'logDate dailyWellbeing'
    },
    { path: 'Condition', select: 'condition' }
  ]);

  if (!healthbuddy) {
    return next(
      new ErrorResponse(
        `Healthbuddy not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: healthbuddy });
});

//@desc     Create new healthbuddy
//@route    POST /api/v1/healthbuddies
//@access   Private

exports.createHealthbuddy = asyncHandler(async (req, res, next) => {
  //  Add user to req.body
  req.body.user = req.user.id;

  // Check for existing healthbuddy
  const publishedHealthbuddy = await Healthbuddy.findOne({ user: req.user.id });

  // If the user is not premium, they can only add one Healthbuddy
  if (publishedHealthbuddy && req.user.role !== 'premium') {
    return next(
      new ErrorResponse(
        `Sorry ${req.user.id}, only premium members are allowed to have more than 1 health buddy at a time...`,
        400
      )
    );
  }

  const healthbuddy = await Healthbuddy.create(req.body);

  res.status(201).json({ success: true, data: healthbuddy });
});

// SPOT WHERE UPLOAD PHOTO ROUTE WILL GO
// *********** INCLUDE IN PHOTO ROUTE **********

//    VIDEO 54 @ 8 MIN
//  Make sure user is healthbuddy owner
//  if (
//   healthbuddy.user.toString() !== req.user.id &&
//   req.user.role !== 'admin'
// ) {
//   return next(
//     new ErrorResponse(
//       `User ${req.params.id} is not authorized to delete this healthbuddy`,
//       401
//     )
//   );
// }
//  ************************************************

//@desc     Update  healthbuddy
//@route    PUT /api/v1/healthbuddies/:id
//@access   Private

exports.updateHealthbuddy = asyncHandler(async (req, res, next) => {
  let healthbuddy = await Healthbuddy.findById(req.params.id);

  console.log('Firing Here Flag 1');

  if (!healthbuddy) {
    return next(
      new ErrorResponse(
        `Healthbuddy not found with id of ${req.params.id}`,
        404
      )
    );
  }
  console.log('Firing here!');
  console.log(req.user.id);
  console.log(req.user.role);
  console.log(healthbuddy.user);
  //  Make sure user is healthbuddy owner
  if (
    healthbuddy.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this healthbuddy`,
        401
      )
    );
  }

  healthbuddy = await Healthbuddy.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: healthbuddy });
});

//@desc     Delete  healthbuddy
//@route    DELETE /api/v1/healthbuddies/:id
//@access   Private

exports.deleteHealthbuddy = asyncHandler(async (req, res, next) => {
  const healthbuddy = await Healthbuddy.findById(req.params.id);

  if (!healthbuddy) {
    return next(
      new ErrorResponse(
        `Healthbuddy not found with id of ${req.params.id}`,
        404
      )
    );
  }

  //  Make sure user is healthbuddy owner
  if (
    healthbuddy.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this healthbuddy`,
        401
      )
    );
  }

  healthbuddy.remove();

  res.status(200).json({ success: true, data: {} });
});
