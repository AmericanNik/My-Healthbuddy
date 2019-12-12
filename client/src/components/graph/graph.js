import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import OptionDivider from './OptionDivider';
import API from "../../utils/API";
import demoLogs from "../../utils/demoLogs";
import LogList from "../logList/logList";
import "./graph.css";


let dateArray = [];
let severityArray = [];
let activityArray = [];
let temperatureArray = [];
let humidityArray = [];

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      chartData: {
        labels: dateArray,
        datasets: [
          {
            label: 'Well-Being',
            data: severityArray,
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Activity Level',
            data: activityArray,
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Temperature(divided by 10)',
            data: temperatureArray,
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Humidity(divided by 10)',
            data: humidityArray,
            backgroundColor: 'purple',
            borderColor: 'purple',
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
      let dateElem = elem.date;
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
    // API.getLogs().then(
    //   logs.forEach(function (elem) {
    //     let monthArr = [
    //       "Jan",
    //       "Feb",
    //       "Mar",
    //       "Apr",
    //       "May",
    //       "Jun",
    //       "Jul",
    //       "Aug",
    //       "Sep",
    //       "Oct",
    //       "Nov",
    //       "Dec"
    //     ];
    //     let dateElem = elem.logDate;
    //     let date = new Date(dateElem);
    //     let month = monthArr[date.getMonth()];
    //     let day = date.getDate();
    //     let fullDate = `${month} ${day}`;
    //     dateArray.push(fullDate);
    //     severityArray.push(elem.dailyWellbeing);
    //     temperatureArray.push((elem.logWeather.weatherTemp) / 10);
    //     humidityArray.push((elem.logWeather.weatherHumidity) / 10);
    //     activityArray.push(elem.dailyActivity);
    //   }),
      this.forceUpdate();

  };

  handleClick = () => {
    if (this.state.clicked === false) {
      this.setState({
        clicked: true
      })
    }
    else {
      this.setState({
        clicked: false
      })
    }
  }



  render() {
    const isClicked = this.state.clicked;

    return (
      <div className='landing graphContainer'>
        <div className='ui grid fluid'>
          <div className='ui two column centered grid'>
            <div className='column'>
              <h1 className='dashboardTitle'>
                Welcome To Your HealthBuddy Dashboard
              </h1>
            </div>
          </div>
        </div>
        <div className='mainArea'>
          <div className='graph'>
            <Line
              data={this.state.chartData}
              width={800}
              height={400}
              options={{
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: 'Health Buddy Trends',
                  fontSize: 25
                }
              }}
            />
          </div>
          <button onClick={this.handleClick}>Test Button</button>
          <OptionDivider />
          <div className="graph">
            {isClicked ? (
              <LogList />
            ) : (
                null
              )}
          </div>
        </div>
      </div>
    );
  }
}
export default Graph;
