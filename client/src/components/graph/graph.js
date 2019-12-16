import React, { Component, useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import OptionDivider from './OptionDivider';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';
// const logs = require('../../../../controllers/logs');
import Logs from '../../utils/API';
// import demoLogs from '../../utils/demoLogs';
import LogList from '../logList/logList';
import './graph.css';
var moment = require('moment');

let logEntry = '';
let logTime = '';
let dateArray = [];
let severityArray = [];
let activityArray = [];
let temperatureArray = [];
let humidityArray = [];

const Graph = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const [user1, setUser] = useState({
    logEntry: ''
  });
  const [clicked, setClicked] = useState({
    isClicked: true
  });

  const {
    isClicked,
    logEntry,
    logTime,
    city,
    stateAbbr,
    overallWellbeing,
    activity,
    conditions
  } = user1;

  const loadData = async () => {
    try {
      const userData = await axios.get(
        'https://my-healthbuddy.herokuapp.com/api/v1/auth/myHealthbuddy'
      );
      // console.log(userData);
      console.log(userData.data.data.logs);
      if (dateArray.lenth === 0) {
        let logArray = userData.data.data.logs;
        logArray.forEach(function(elem) {
          let date = elem.logDate * 1000;
          let fullDate = moment(date).format('MMM DD');
          dateArray.push(fullDate);
          severityArray.push(elem.dailyWellbeing);
          activityArray.push(elem.dailyActivity);
          temperatureArray.push(elem.temperature / 10);
          humidityArray.push((elem.humidity * 1000) / 10);
        });
      } else {
        dateArray = [];
        severityArray = [];
        activityArray = [];
        temperatureArray = [];
        humidityArray = [];
        let logArray = userData.data.data.logs;
        logArray.forEach(function(elem) {
          let date = elem.logDate * 1000;
          let fullDate = moment(date).format('MMM DD');
          dateArray.push(fullDate);
          severityArray.push(elem.dailyWellbeing);
          activityArray.push(elem.dailyActivity);
          temperatureArray.push(elem.temperature / 10);
          humidityArray.push((elem.humidity * 100) / 10);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    authContext.loadUser();
    // loadDemoData();
    loadData();

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

  const handleClick = () => {
    if (clicked.isClicked) {
      setClicked({
        isClicked: false
      });
    } else {
      setClicked({
        isClicked: true
      });
    }
  };

  return (
    <div className='landing graphContainer'>
      <div className='ui fluid grid'>
        <div className='column'>
          <h1 className='dashboardTitle'>
            Welcome {user && user.data.name} To Your HealthBuddy Dashboard
          </h1>
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
        <OptionDivider handleClick={handleClick} />
        <div className='graph'>
          {clicked.isClicked === true ? <LogList /> : null}
        </div>
      </div>
    </div>
  );
};

export default Graph;
