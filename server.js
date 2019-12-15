const express = require('express');
const request = require('request');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

//load env vars

dotenv.config({ path: './config/config.env' });

// Connect to database

connectDB();

//Route files
const healthbuddies = require('./routes/healthbuddies');
const logs = require('./routes/logs');
const auth = require('./routes/auth');
const conditions = require('./routes/conditions');
const dataCall = require('./routes/dataCall');

// Connect to Dabatase

const app = express();

app.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    'https://my-healthbuddy.herokuapp.com'
  ); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// body parser
app.use(express.json());

app.use(cookieParser());

//  Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
//  Mount routers
app.use('/api/v1/healthbuddies', healthbuddies);
app.use('/api/v1/logs', logs);
app.use('/api/v1/auth', auth);
app.use('/api/v1/conditions', conditions);
app.use('/api/v1/dataCall', dataCall);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on http://localhost:${PORT}`
      .brightBlue.bold.underline
  )
);

// handle unhandled promoise rejections

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
