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

const LogEntry = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }
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
    if (overallWellbeing === null) {
      setAlert('Please Enter Daily Wellbeing', 'danger');
    } else {
      let fullLog = {
        logEntry,
        overallWellbeing,
        city,
        stateAbbr,
        activity,
        logTime
      };
      console.log(fullLog);
      props.history.push('/dashboard');
    }
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
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
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
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </select>
            <h2>Location</h2>
            <p>Where were you today?</p>
            <input type='text' name='city' value={city} onChange={onChange} />
            City
            <select name='stateAbbr' value={stateAbbr} onChange={onChange}>
              <option value='AL'>Alabama</option>
              <option value='AK'>Alaska</option>
              <option value='AZ'>Arizona</option>
              <option value='AR'>Arkansas</option>
              <option value='CA'>California</option>
              <option value='CO'>Colorado</option>
              <option value='CT'>Connecticut</option>
              <option value='DE'>Delaware</option>
              <option value='FL'>Florida</option>
              <option value='GA'>Georgia</option>
              <option value='HI'>Hawaii</option>
              <option value='ID'>Idaho</option>
              <option value='IL'>Illinois</option>
              <option value='IN'>Indiana</option>
              <option value='IA'>Iowa</option>
              <option value='KS'>Kansas</option>
              <option value='KY'>Kentucky</option>
              <option value='LA'>Louisiana</option>
              <option value='ME'>Maine</option>
              <option value='MD'>Maryland</option>
              <option value='MA'>Massachusetts</option>
              <option value='MI'>Michigan</option>
              <option value='MN'>Minnesota</option>
              <option value='MS'>Mississippi</option>
              <option value='MO'>Missouri</option>
              <option value='MT'>Montana</option>
              <option value='NE'>Nebraska</option>
              <option value='NV'>Nevada</option>
              <option value='NH'>New Hampshire</option>
              <option value='NJ'>New Jersey</option>
              <option value='NM'>New Mexico</option>
              <option value='NY'>New York</option>
              <option value='NC'>North Carolina</option>
              <option value='ND'>North Dakota</option>
              <option value='OH'>Ohio</option>
              <option value='OK'>Oklahoma</option>
              <option value='OR'>Oregon</option>
              <option value='PA'>Pennsylvania</option>
              <option value='RI'>Rhode Island</option>
              <option value='SC'>South Carolina</option>
              <option value='SD'>South Dakota</option>
              <option value='TN'>Tennessee</option>
              <option value='TX'>Texas</option>
              <option value='UT'>Utah</option>
              <option value='VT'>Vermont</option>
              <option value='VA'>Virginia</option>
              <option value='WA'>Washington</option>
              <option value='WV'>West Virginia</option>
              <option value='WI'>Wisconsin</option>
              <option value='WY'>Wyoming</option>
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
