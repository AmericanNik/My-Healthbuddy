import React, {
  Fragment,
  useState,
  useContext,
  Component,
  useEffect
} from 'react';
import { Redirect } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import './Logs.css';
import Atmosphere from '../LogEntry/Atmosphere/Atmosphere';
import OverallWellbeing from '../LogEntry/overallWellbeing/OverallWellbeing';
import DailyActivity from '../LogEntry/DailyActivity/DailyActivity';
import SubmitLog from '../LogEntry/SubmitLog/SubmitLog';
import JournalEntry from '../LogEntry/JournalEntry/JournalEntry';
import ConditionSearchBar from '../conditionSearchBar/ConditionSearchBar';
import ConditionsDisplay from '../LogEntry/ConditionsDisplay/ConditionsDisplay';
import Alerts from '../../components/layout/Alerts';
import { Link } from 'react-router-dom';
import StateList from '../../utils/states.json';
import './LogEntry.css';

const LogEntry = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    authContext.loadUser();
    if (error === 'Duplicate field value entered') {
      setAlert('User Already Exists', 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    journalEntry: '',
    logTime: '',
    overallWellbeing: 1,
    dailyActivity: 1,
    conditions: [],
    conditionsTest: [],
    conditionsString: '',
    currentSummary: '',
    dailySummary: '',
    longitude: '',
    latitude: '',
    pressure: '',
    ozone: '',
    moonPhase: '',
    windSpeed: '',
    humidity: '',
    dewPoint: '',
    temperature: '',
    logDate: '',
    dataSent: null
  });

  const {
    journalEntry,
    logTime,
    randomObject,
    overallWellbeing,
    dailyActivity,
    conditions,
    currentSummary,
    dailySummary,
    longitude,
    latitude,
    pressure,
    ozone,
    moonPhase,
    windSpeed,
    humidity,
    dewPoint,
    temperature,
    logDate,
    dataSent,
    conditionsTest
  } = user;

  const returnCurrentSummary = (
    currentSummary,
    dailySummary,
    longitude,
    latitude,
    pressure,
    ozone,
    moonPhase,
    windSpeed,
    humidity,
    dewPoint,
    temperature,
    logDate,
    dataSent
  ) => {
    console.log('-----------------------------');
    console.log(currentSummary);
    setUser({
      ...user,
      currentSummary: currentSummary,
      dailySummary: dailySummary,
      longitude,
      latitude,
      pressure,
      ozone,
      moonPhase,
      windSpeed,
      humidity,
      dewPoint,
      temperature,
      logDate,
      dataSent: dataSent + 1
    });
  };

  const returnDataSent = dataSent => {
    setUser({ ...user, dataSent: dataSent });
  };

  const returnDailySummary = dailySummary => {
    setUser({ ...user, dailySummary: dailySummary });
  };

  const returnOverallWellbeing = overallWellbeing => {
    setUser({ ...user, overallWellbeing: overallWellbeing });
  };

  const returnDailyAcivity = dailyActivity => {
    setUser({ ...user, dailyActivity: dailyActivity });
  };

  const returnJournalEntry = journalEntry => {
    setUser({ ...user, journalEntry: journalEntry });
  };
  const returnConditionToLog = (condition, symptoms, value) => {
    const newConditions = [...conditions];
    newConditions.push(condition);
    const testGroup = {
      condition: condition,
      symptoms: symptoms,
      value: value
    };
    const newConditionsTest = [...conditionsTest];
    newConditionsTest.push(testGroup);

    console.log(condition);
    console.log(symptoms);
    console.log(newConditions);
    setUser({
      ...user,
      conditions: [...newConditions],
      conditionsTest: newConditionsTest
    });
  };

  const returnConditionStats = (condition, value) => {
    const newValues = [...conditionsTest];

    newValues.forEach(i => {
      if (i.condition === condition) {
        console.log('changing value of :' + condition);
        i.value = value;
      }
    });
  };

  const successfullySubmitted = () => {
    props.history.push('/dashboard');
  };

  const logAlreadySubmitedAlert = () => {
    setAlert('Log Already Submited For Today', 'danger');
  };

  return (
    <div className='container'>
      <div className='logContainer'>
        <Fragment>
          <div className='logEntryHeader'>
            <h1 className='large text-primary'>How Was Today?</h1>
            <h2>{`Enter todays details to help keep track of your life & health!`}</h2>
          </div>
          <JournalEntry returnJournalEntry={returnJournalEntry} />
          <Atmosphere
            returnCurrentSummary={returnCurrentSummary}
            returnDailySummary={returnDailySummary}
            returnDataSent={returnDataSent}
          />
          <OverallWellbeing returnOverallWellbeing={returnOverallWellbeing} />
          <DailyActivity returnDailyAcivity={returnDailyAcivity} />
          <ConditionsDisplay
            conditions={conditions}
            returnConditionStats={returnConditionStats}
          />
          <ConditionSearchBar
            headline={'Experience any conditions today?'}
            buttonIntro={'Add To Your Log: '}
            ButtonOutro={'Clik To Add Condition'}
            linkTo={'#!'}
            returnConditionToLog={returnConditionToLog}
          />
          <Alerts />
          <SubmitLog
            journalEntry={journalEntry}
            logTime={logTime}
            overallWellbeing={overallWellbeing}
            dailyActivity={dailyActivity}
            conditions={conditions}
            currentSummary={currentSummary}
            dailySummary={dailySummary}
            longitude={longitude}
            latitude={latitude}
            pressure={pressure}
            ozone={ozone}
            moonPhase={moonPhase}
            windSpeed={windSpeed}
            humidity={humidity}
            dewPoint={dewPoint}
            temperature={temperature}
            logDate={logDate}
            dataSent={dataSent}
            conditionTest={conditionsTest}
            logAlreadySubmitedAlert={logAlreadySubmitedAlert}
            successfullySubmitted={successfullySubmitted}
          />
        </Fragment>
      </div>
    </div>
  );
};

export default LogEntry;
