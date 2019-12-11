import React, { Fragment, useState, useEffect, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import Alerts from '../../components/layout/Alerts';
import { Link } from 'react-router-dom';
import ValidationBox from './ValidationBox';
import './Register.css';

const Register = props => {
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
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    console.log('CLicked!!!');
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      var strongRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
      );

      if (strongRegex.test(password)) {
        console.log('Made it here to fire register user!');
        register({
          name,
          email,
          password
        });
        console.log('local storage on submit: ' + localStorage.token);
      } else {
        setAlert('You need a stronger password', 'danger');
      }
    }
  };

  return (
    <div className='landing'>
      <div className='mainArea'>
        <Fragment>
          <div className='container landing-inner'>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
              <i className='fas fa-user'></i> Create Your Account
            </p>
            <div className='alertDisplay'>
              <Alerts />
            </div>
            <form className='form' onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name'
                  value={name}
                  name='name'
                  // required
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                />
              </div>
              <ValidationBox password={password} confirmPassword={password2} />
              <input
                type='submit'
                className='ui fluid button red large'
                value='Register'
                onClick={onSubmit}
              />
            </form>
            <p className='my-1'>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default Register;
