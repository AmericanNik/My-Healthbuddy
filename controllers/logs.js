const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Log = require('../models/Log');
const Healthbuddy = require('../models/Healthbuddy');

exports.getAllLogs = asyncHandler(async (req, res, next) => {
  if (req.params.healthbuddyId) {
    const logs = await Log.find({
      healthbuddy: req.params.healthbuddyId
    }).populate('healthbuddy');

    return res
      .status(200)
      .json({ success: true, count: logs.length, data: logs });
  } else {
    res.status(200).json(res.advancedResults);
  }

  console.log('Flag2');
});

//@desc     Get logs for a healthbuddy
//@route    GET /api/v1/logs
//@route    GET/api/v1/healbuddis/:healthbuddyId/logs
//@access   Private

exports.getLogs = asyncHandler(async (req, res, next) => {
  if (req.params.healthbuddyId) {
    const logs = await Log.find({
      healthbuddy: req.params.healthbuddyId
    })
      .limit(30)
      // .sort({ logDate: -1 })
      .populate('healthbuddy');

    return res
      .status(200)
      .json({ success: true, count: logs.length, data: logs });
  } else {
    res.status(200).json(res.advancedResults);
  }

  console.log('Flag2');
});

//@desc     Get Single Log
//@route    GET /api/v1/logs:id
//@access   Private

exports.getLog = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const log = await Log.findOne({ _id: req.params.id }).populate({
    path: 'healthbuddy',
    select: 'name description'
  });

  if (!log) {
    return next(new ErrorResponse(`No log with id: ${req.params.id}`, 404));
  }

  //  Make sure user is log owner
  if (log.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this log`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: log });
});

//@desc     Create Log
//@route    POST /api/v1/healthbuddies/:healthbuddyId/logs
//@access   Private

exports.addLog = asyncHandler(async (req, res, next) => {
  req.body.healthbuddy = req.params.healthbuddyId;
  req.body.user = req.user.id;

  console.log(req.body.healthbuddy);

  const healthbuddy = await Healthbuddy.findOne({
    _id: req.params.healthbuddyId
  });

  if (!healthbuddy) {
    return next(
      new ErrorResponse(
        `No Healthbuddy with id: ${req.params.healthbuddyId}`,
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
        `User ${req.user.id} is not authorized to add a log to this healthbuddy`,
        401
      )
    );
  }

  const log = await Log.create(req.body);
  res.status(200).json({ success: true, data: log });
});

//@desc     Update a log
//@route    PUT /api/v1/logs/:id
//@access   Private

exports.updateLog = asyncHandler(async (req, res, next) => {
  let log = await Log.findOne({ _id: req.params.id });

  if (!log) {
    return next(
      new ErrorResponse(`No log with id: ${req.params.healthbuddyId}`, 404)
    );
  }

  //  Make sure user is log owner
  if (log.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this log`,
        401
      )
    );
  }

  log = await Log.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: log });
});

//@desc     Delete Log
//@route    DELETE /api/v1/logs/:id
//@access   Private

exports.deleteLog = asyncHandler(async (req, res, next) => {
  const log = await Log.findById(req.params.id);

  if (!log) {
    return next(new ErrorResponse(`No log with id: ${req.params.id}`, 404));
  }

  //  Make sure user is log owner
  if (log.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this log`,
        401
      )
    );
  }

  await log.remove();

  res.status(200).json({ success: true, data: {} });
});
