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
import { Link } from 'react-router-dom';
import StateList from '../../utils/states.json';
import Logs from "../../utils/API";

let zipKey;
let weatherKey;

if (process.env.NODE_ENV !== 'production'){
  zipKey = process.env.REACT_APP_zipCodeAPIKey;
  weatherKey = process.env.REACT_APP_weatherAPIKey;
}
else{
  zipKey = process.env.zipCodeAPIKey;
  weatherKey = process.env.weatherAPIKey;
}

let ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
    logEntry: '',
    logTime: '',
    city: '',
    stateAbbr: '',
    overallWellbeing: 0,
    activity: '',
    conditions: []
  });

  const {
    logEntry,
    logTime,
    city,
    stateAbbr,
    overallWellbeing,
    activity,
    conditions
  } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = e => {
    console.log('clicked!!!');
    e.preventDefault();

    Logs.createLog(user);

    // if (overallWellbeing === null) {
    //   setAlert('Please Enter Daily Wellbeing', 'danger');
    // } else {
    //   let fullLog = {
    //     weather,
    //     logEntry,
    //     overallWellbeing,
    //     city,
    //     stateAbbr,
    //     activity,
    //     logTime
    //   };
    //   console.log(fullLog);
    //   props.history.push('/dashboard');
    // }
  };

  return (
    <div className='container'>
      <div className='logContainer'>
        <Fragment>
          <h1 className='large text-primary'>How did you do today?</h1>
          <div>
            <div>
              {logEntry !== '' ? (
                <div className='screenJournal'>
                  <h5>{logTime}</h5>
                  <h4 className='journalHeader'> Dear HealthBuddy...</h4>
                  <p className='journalEntry'>{logEntry}</p>
                </div>
              ) : (
                  <div></div>
                )}
            </div>
          </div>
          <form className='form' onSubmit={onFormSubmit}>
            <div className='form-group'>
              <textarea
                className='logEntry'
                type='text'
                value={logEntry}
                placeholder='Dear HealthBuddy, today was...'
                name='logEntry'
                href='logEntry'
                onChange={onChange}
              />
            </div>
            <h2>Well-Being</h2>
            <p>On a scale of 1-10, how did you feel today?</p>
            <select
              type='number'
              value={overallWellbeing}
              name='overallWellbeing'
              href='overallWellbeing'
              onChange={onChange}
            >
              {ratings.map(function (num, index) {
                return <Fragment key={`Wellbeing ${index}`}>
                  <option value={num}>{num}</option>
                </Fragment>
              })}
            </select>
            <h2>Activity</h2>
            <p>On a scale of 1-10, how active were you today?</p>
            <select
              type='number'
              value={activity}
              name='activity'
              href='activity'
              onChange={onChange}
            >
              {ratings.map(function (num, index) {
                return <Fragment key={`Activity ${index}`}>
                  <option value={num}>{num}</option>
                </Fragment>
              })}
            </select>
            <h2>Location</h2>
            <p>Where were you today?</p>
            <input type='text' name='city' value={city} onChange={onChange} />
            City
            <select name='stateAbbr' value={stateAbbr} onChange={onChange}>
              {StateList.map(function (item, index) {
                return <Fragment key={`StateList ${index}`}>
                  <option value={item.abbreviation}>{item.name}</option>
                </Fragment>
              })}
            </select>
            <label>State</label>
            <input
              type='submit'
              className='btn btn-primary logSubmit'
              value='Submit'
            />
          </form>
        </Fragment>
      </div>
    </div>
  );
};

export default LogEntry;
