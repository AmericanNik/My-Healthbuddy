import React, { Component, useContext, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import OptionDivider from './OptionDivider';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';
// const logs = require('../../../../controllers/logs');
import Logs from '../../utils/API';
import './graph.css';

let dateArray = ['11/1', '11/2', '11/3', '11/4'];
let severityArray = [6, 5, 8, 3];
let activityArray = [2, 3, 4, 1];
let temperatureArray = [6, 5, 6, 5];
let humidityArray = [4, 4, 4, 3];

const Graph = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const chartData = {
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
        label: 'Temperature',
        data: temperatureArray,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Humidity',
        data: humidityArray,
        backgroundColor: 'purple',
        borderColor: 'purple',
        borderWidth: 2,
        fill: false
      }
    ]
  };
  const convertDate = () => {
    let monthArr = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    let dateElem = null;
    let date = new Date(dateElem);
    let month = monthArr[date.getMonth()];
    let day = date.getDate();
    let fullDate = `${month} ${day}`;
    dateArray.push(fullDate);

    console.log(fullDate);
  };

  //   convertTemp = () => {
  //     let temp = tempElem / 10;
  //     temperatureArray.push(temp);
  //   };

  //   convertHumidity = () => {
  //     let humElem = null;
  //     let humidity = humElem / 10;
  //     humidityArray.push(humidity);
  //   };

  // temperature: Math.floor(((response.data.main.temp - 273.15) * 1.8 + 32) / 10),
  // humidity: Math.floor(response.main.humidity / 10)

  // componentDidMount() {
  // Logs.getLogs()
  //   .then
  //   logs.forEach(function(elem) {
  //     dateArray.push(this.convertDate(elem.logDate));
  //     severityArray.push(elem.dailyWellbeing);
  //     temperatureArray.push(this.convertTemp(elem.logWeather.weatherTemp));
  //     humidityArray.push(
  //       this.convertHumidity(elem.logWeather.weatherHumidity)
  //     );
  //     activityArray.push(elem.dailyActivity);
  //   }),
  //   this.forceUpdate()
  //     ();
  // }

  return (
    <div className='landing graphContainer'>
      <div className='ui grid fluid'>
        <div className='ui two column centered grid'>
          <div className='column'>
            <h1 className='dashboardTitle'>
              Welcome {user && user.data.name} To Your HealthBuddy Dashboard
            </h1>
          </div>
        </div>
      </div>
      <div className='mainArea'>
        <div className='graph'>
          <Line
            data={chartData}
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

        <OptionDivider />
        <h2>
          Enter your daily log <Link to='logs'>here!</Link>
        </h2>
      </div>
    </div>
  );
};

export default Graph;
