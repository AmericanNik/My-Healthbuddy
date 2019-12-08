import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Link } from 'react-router-dom';
// const logs = require('../../../../controllers/logs');
import Logs from "../../utils/API";
import demoLogs from "../../utils/demoLogs";

let dateArray = [];
let severityArray = [];
let activityArray = [];
let temperatureArray = [];
let humidityArray = [];

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: dateArray,
        datasets: [
          {
            label: "Well-Being",
            data: severityArray,
            backgroundColor: "green",
            borderColor: "green",
            borderWidth: 2,
            fill: false
          },
          {
            label: "Activity Level",
            data: activityArray,
            backgroundColor: "blue",
            borderColor: "blue",
            borderWidth: 2,
            fill: false
          },
          {
            label: "Temperature",
            data: temperatureArray,
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 2,
            fill: false
          },
          {
            label: "Humidity",
            data: humidityArray,
            backgroundColor: "purple",
            borderColor: "purple",
            borderWidth: 2,
            fill: false
          }
        ]
      }
    };
  }

  componentDidMount() {
    demoLogs.forEach(function (elem) {
      let monthArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let dateElem =elem.date;
      let date = new Date(dateElem);
      let month = monthArr[date.getMonth()];
      let day = date.getDate();
      let fullDate = `${month} ${day}`;
      dateArray.push(fullDate);
      severityArray.push(elem.dailyWellbeing);
      activityArray.push(elem.activity);
      temperatureArray.push((elem.weather.temperature) / 10);
      humidityArray.push((elem.weather.humidity) / 10)
    })
    // Logs.getLogs().then(
    //   logs.forEach(function(elem) {
    //     dateArray.push(this.convertDate(elem.logDate));
    //     severityArray.push(elem.dailyWellbeing);
    //     temperatureArray.push(this.convertTemp(elem.logWeather.weatherTemp));
    //     humidityArray.push(
    //       this.convertHumidity(elem.logWeather.weatherHumidity)
    //     );
    //     activityArray.push(elem.dailyActivity);
    //   }),
    this.forceUpdate();

  };


  render() {
    return (
      <div className="container">
        <div className="graph">
          <Line
            data={this.state.chartData}
            width={800}
            height={400}
            options={{
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Health Buddy Trends",
                fontSize: 25
              }
            }}
          />
        </div>
        <h2>Enter your daily log <Link to='logs'>here!</Link></h2>
      </div>
    );
  }
}

export default Graph;
