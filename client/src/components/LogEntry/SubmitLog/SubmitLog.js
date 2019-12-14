import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import './SubmitLog.css';

const dailyLog = async props => {
  if (props) {
    var logDate = new Date();

    const compiledLog = {
      journalEntry: props.journalEntry,
      logTime: props.logTime,
      dailyWellbeing: parseInt(props.overallWellbeing),
      dailyActivity: parseInt(props.dailyActivity),
      conditions: props.conditions,
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
      logDate: logDate.toISOString(),
      conditionTest: props.conditionTest
    };
    console.log(compiledLog);

    const data = await axios.get(
      'http://localhost:5000/api/v1/auth/myHealthbuddy'
    );
    console.log(data.data.data);
    console.log('HealthbuddyID: ' + data.data.data.healthbuddy[0]._id);

    console.log(compiledLog.logDate);

    console.log();

    const healthbuddyID = data.data.data.healthbuddy[0]._id;
    const logTotal = data.data.data.logs.length;

    console.log(data.data.data.logs.length);
    console.log('LogTotal: ' + logTotal);
    console.log('HealthbuddyID: ' + healthbuddyID);

    if (logTotal === 0) {
      console.log('Firing Post!!!!!!!!!!!');
      const logPost = await axios.post(
        `http://localhost:5000/api/v1/healthbuddies/${healthbuddyID}/logs`,
        compiledLog
      );

      console.log(logPost);

      if (logPost.status === 200) {
        props.successfullySubmitted();
        return <Redirect push to='/dashboard' />;
      }

      return <Redirect push to='/dashboard' />;
    } else if (logTotal >= 1) {
      const existingLogs = data.data.data.logs;
      const submitedLogDate = compiledLog.logDate.slice(0, 10);
      const mostRecentLogDate = existingLogs
        .pop()
        .logDate.toString()
        .slice(0, 10);

      if (submitedLogDate === mostRecentLogDate) {
        props.logAlreadySubmitedAlert();
        console.log('already submited today');
      } else {
        const logPost = await axios.post(
          `http://localhost:5000/api/v1/healthbuddies/${healthbuddyID}/logs`,
          compiledLog
        );

        console.log(logPost);
        console.log('ATTEMPTING TO REDIRECT HERE TOO');
        return <Redirect to='/dashboard' />;
      }

      console.log(existingLogs.length);
      console.log(mostRecentLogDate);
      console.log(submitedLogDate);

      // const logPost = await axios.post(
      //   `http://localhost:5000/api/v1/healthbuddies/${healthbuddyID}/logs`,
      //   compiledLog
      // );
      // console.log(logPost);
    } else {
      console.log('Nothing Happened!');
    }
  }
};

const SubmitLog = props => {
  const onLogSubmit = e => {
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
