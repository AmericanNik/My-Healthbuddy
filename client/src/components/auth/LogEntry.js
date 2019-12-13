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
    atmosphericData: {}
  });

  const {
    journalEntry,
    logTime,
    overallWellbeing,
    dailyActivity,
    conditions,
    atmosphericData
  } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = e => {
    console.log('clicked!!!');
    e.preventDefault();
    if (overallWellbeing === null) {
      setAlert('Please Enter Daily Wellbeing', 'danger');
    } else {
      let fullLog = {
        journalEntry,
        overallWellbeing,
        dailyActivity,
        logTime,
        atmosphericData
      };
      console.log(fullLog);
      props.history.push('/dashboard');
    }
  };

  const returnAtmosphere = atmosphereData => {
    console.log('-----------------------------');
    console.log(atmosphereData);
    setUser({ ...user, atmosphericData: atmosphereData });
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

  return (
    <div className='container'>
      <div className='logContainer'>
        <Fragment>
          <div className='logEntryHeader'>
            <h1 className='large text-primary'>How Was Today?</h1>
            <h2>{`Enter todays details to help keep track of your life & health!`}</h2>
          </div>
          <JournalEntry returnJournalEntry={returnJournalEntry} />
          <Atmosphere returnAtmosphere={returnAtmosphere} />
          <OverallWellbeing returnOverallWellbeing={returnOverallWellbeing} />
          <DailyActivity returnDailyAcivity={returnDailyAcivity} />
          <SubmitLog
            journalEntry={journalEntry}
            logTime={logTime}
            overallWellbeing={overallWellbeing}
            dailyActivity={dailyActivity}
            conditions={conditions}
            atmosphericData={atmosphericData}
          />
        </Fragment>
      </div>
    </div>
  );
};

export default LogEntry;
