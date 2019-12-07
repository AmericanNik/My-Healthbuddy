const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
require("dotenv").config();

//load env vars

dotenv.config({ path: "./config/config.env" });

// Connect to database

connectDB();

//Route files
const healthbuddies = require("./routes/healthbuddies");
const logs = require("./routes/logs");
const auth = require("./routes/auth");
const conditions = require("./routes/conditions");

// Connect to Dabatase

const app = express();

// body parser
app.use(express.json());

app.use(cookieParser());

//  Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//  Mount routers
app.use("/api/v1/healthbuddies", healthbuddies);
app.use("/api/v1/logs", logs);
app.use("/api/v1/auth", auth);
app.use("/api/v1/conditions", conditions);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
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

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
