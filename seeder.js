const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//load env variables

dotenv.config({ path: "./config/config.env" });

//Load models

const Healthbuddy = require("./models/Healthbuddy");
const Log = require("./models/Log");
const User = require("./models/User");
const Condition = require("./models/Condition");

//connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
  // useUnifiedTopology: true
});

//read JSON files

const healthbuddies = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/HealthbuddyExample.json`, "utf-8")
);

const logs = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/logs.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const conditions = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/conditions.json`, "utf-8")
);

//  Import into DB

const importData = async () => {
  try {
    await Healthbuddy.create(healthbuddies);
    await Log.create(logs);
    await User.create(users);
    // await Condition.create(conditions);
    console.log("Data Imported...".white.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete Data

const deleteData = async () => {
  try {
    await Healthbuddy.deleteMany();
    await Log.deleteMany();
    await User.deleteMany();
    await Condition.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
