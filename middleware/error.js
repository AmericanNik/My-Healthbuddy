const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  //log to console for dev
  console.log('DEV CONSOLE LOGS');
  console.log(err.name);
  console.log(err);

  console.log('req.user: ');
  console.log(req.user);

  //Mongoose bad object ID

  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    //   const message = `Duplicate field value entered`;
    error = new ErrorResponse('Duplicate field value entered', 400);
  }

  //Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(value => value.message);

    error = new ErrorResponse(message, 206, { data: err.message });
    console.log(error.message);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
