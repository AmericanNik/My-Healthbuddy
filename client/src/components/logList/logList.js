import React, { useState, useEffect, Fragment } from "react";
// import { Link } from "react-router-dom";
// import Logs from "../../utils/API";
import axios from "axios";

// import demoLogs from "../../utils/demoLogs";
var moment = require("moment");

export default function LogList() {
  const [logListArray, setLogListArray] = useState([]);

  useEffect(() => {
    axios
      .get("https://my-healthbuddy.herokuapp.com/api/v1/auth/myHealthbuddy")
      .then((data) => {
        setLogListArray(data.data.data.logs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div>
        {logListArray.map(function (item, index) {
          return (
            <section key={index}>
              <hr />
              <h3>Date: {moment(item.logDate * 1000).format("MMM D YYYY")}</h3>
              <h3>Daily Well-Being: {item.dailyWellbeing}</h3>
              <h3>Activity Level: {item.dailyActivity}</h3>
              <h3>Temperature: {item.temperature}&deg;F</h3>
              <h3>Humidity: {item.humidity} </h3>
              <h3>Note: {item.journalEntry}</h3>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/*
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Logs from "../../utils/API";
import axios from "axios";
// import demoLogs from "../../utils/demoLogs";
var moment = require("moment");

let logListArray = [];

class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = { date: [] };
  }

  loadData = async () => {
    try {
      const userData = await axios.get(
        "https://my-healthbuddy.herokuapp.com/api/v1/auth/myHealthbuddy"
      );

      return (logListArray = userData.data.data.logs);
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="container">
        <div>
          {logListArray.map(function (item, index) {
            return (
              <Fragment key={index}>
                <hr />
                <h3>
                  Date: {moment(item.logDate * 1000).format("MMM D YYYY")}
                </h3>
                <h3>Daily Well-Being: {item.dailyWellbeing}</h3>
                <h3>Activity Level: {item.dailyActivity}</h3>
                <h3>Temperature: {item.temperature}&deg;F</h3>
                <h3>Humidity: {item.humidity} </h3>
                <h3>Note: {item.journalEntry}</h3>
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

export default LogList;
*/
