// const ErrorResponse = require('../utils/errorResponse');
// const asyncHandler = require('../middleware/async');
// const User = require('../models/User');
// const Healthbuddy = require('../models/Healthbuddy');

// exports.getAllUsers = asyncHandler(async (req, res, next) => {
//   if (req.params.userId) {
//     const users = await Log.find({
//       healthbuddy: req.params.userId
//     }).populate('healthbuddy');

//     return res
//       .status(200)
//       .json({ success: true, count: users.length, data: users });
//   } else {
//     res.status(200).json(res.advancedResults);
//   }

//   console.log('Flag2');
// });
