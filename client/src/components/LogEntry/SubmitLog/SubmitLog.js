import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import './SubmitLog.css';

const dailyLog = async (props) => {
  if (props) {
    var logDate = Date.now();
    const answerArr = [];
    for (let i = 0; i < props.conditionTest.length; i++) {
      answerArr.push(props.conditionTest[i].value);
    }
    console.log(answerArr);

    const compiledLog = {
      journalEntry: props.journalEntry,
      logTime: props.logTime,
      dailyWellbeing: parseInt(props.overallWellbeing),
      dailyActivity: parseInt(props.dailyActivity),
      conditions: props.conditionTest,
      currentSummary: props.currentSummary,
      dailySummary: props.dailySummary,
      longitude: props.longitude,
      latitude: props.latitude,
      pressure: props.pressure,
      ozone: props.ozone,
      moonPhase: props.moonPhase,
      windSpeed: props.windSpeed,
      humidity: props.humidity,
      dewPoint: props.dewPoint,
      temperature: props.temperature,
      logDate: logDate,
    };
    console.log(compiledLog);

    try {
      const data = await axios.get(
        'https://my-healthbuddy.herokuapp.com/api/v1/auth/myHealthbuddy'
      );
      console.log(data);
    } catch (err) {
      console.log('ERRORRRRRR' + err);
      console.log('TYPEERROR: ' + err.error);
      if (err.toString() === 'Error: Request failed with status code 500') {
        const creatingHealthbuddy = await axios.post(
          'https://my-healthbuddy.herokuapp.com/api/v1/healthbuddies',
          { name: props.userName }
        );
        console.log('YOU SHOULD CREATE A HEALTHBUDDY');
        console.log(creatingHealthbuddy);
      }
    }

    const data = await axios.get(
      'https://my-healthbuddy.herokuapp.com/api/v1/auth/myHealthbuddy'
    );
    console.log(data.data.data);
    console.log('HealthbuddyID: ' + data.data.data.healthbuddy[0]._id);

    console.log(compiledLog.logDate);
    if (!data) {
      console.log('NO HEALTHBUDDY FOUND');
      return console.log('DYING');
    }
    console.log();

    const healthbuddyID = data.data.data.healthbuddy[0]._id;
    const logTotal = data.data.data.logs.length;

    console.log(data.data.data.logs.length);
    console.log('LogTotal: ' + logTotal);
    console.log('HealthbuddyID: ' + healthbuddyID);

    if (logTotal === 0) {
      console.log('Firing Post!!!!!!!!!!!');
      const logPost = await axios.post(
        `https://my-healthbuddy.herokuapp.com/api/v1/healthbuddies/${healthbuddyID}/logs`,
        compiledLog
      );

      console.log(logPost);

      if (logPost.status === 200) {
        props.successfullySubmitted();
        return <Redirect push to='/dashboard' />;
      }

      return <Redirect push to='/dashboard' />;
    } else if (logTotal >= 1) {
      console.log('object');
      const mostRecentLog = data.data.data.logs.pop();

      const submitedLogDate = Date(compiledLog.logDate).toString().slice(0, 16);
      console.log('submitedLogDate:' + submitedLogDate);

      const mostRecentLogDate = Date(mostRecentLog.logDate)
        .toString()
        .slice(0, 16);

      let todaysDate = Date.now();

      console.log('Todays Date Step 1: ' + todaysDate);

      todaysDate = Date(todaysDate);

      console.log('Todays Date Step 2: ' + todaysDate.slice(0, 16));

      let submittedDate = new Date();
      submittedDate.setTime(mostRecentLog.logDate);
      console.log('---------------------------------');
      console.log(mostRecentLog);
      console.log(mostRecentLog.logDate);
      console.log(submitedLogDate);
      console.log(mostRecentLogDate);

      submittedDate = submittedDate.toString().slice(0, 16);
      console.log(submittedDate);
      console.log('----------------------------------');

      if (submittedDate === mostRecentLogDate) {
        console.log('Already submitted a log for today!');
        props.logAlreadySubmitedAlert();
      } else {
        console.log('----First Log Of The Day----');
        const logPost = await axios.post(
          `https://my-healthbuddy.herokuapp.com/api/v1/healthbuddies/${healthbuddyID}/logs`,
          compiledLog
        );

        console.log(logPost);
        console.log('ATTEMPTING TO REDIRECT HERE TOO');
        return <Redirect to='/dashboard' />;
      }
    } else {
      console.log('Nothing Happened!');
    }
  }
};

const SubmitLog = (props) => {
  const onLogSubmit = (e) => {
    dailyLog(props);
  };

  return (
    <div className='submitLogButtonContainer'>
      <div className='submitLogButton' onClick={onLogSubmit}>
        <h2>Submit Log</h2>
      </div>
    </div>
  );
};

export default SubmitLog;
