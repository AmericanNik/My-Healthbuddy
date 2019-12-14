import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }
    if (error === 'Invalid Credentials') {
      setAlert('User Already Exists', 'danger');
      clearErrors();
    }
  });

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({ email, password });
    }
  };

  return (
    <section className='landing'>
      <div>
        <div className='mainArea'>
          <div className='container landing-inner'>
            <Fragment>
              <h1 className='large text-primary'>Welcome Back!</h1>
              <p className='lead'>
                <i className='fas fa-user'></i> Log into your account
              </p>
              <form className='form'>
                <div className='form-group'>
                  <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={onChange}
                    name='password'
                  />
                </div>
                <div className='form-group'></div>
                <input
                  type='submit'
                  className='ui fluid button red large'
                  value='Login'
                  onClick={onSubmit}
                />
              </form>
            </Fragment>
            <br />
            <div>
              Don't have an account? <Link to='register'>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
