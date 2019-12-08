import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='container displayContainer loginDisplay'>
          <Fragment>
            <h1 className='large text-primary'>Welcome Back!</h1>
            <p className='lead'>
              <i className='fas fa-user'></i> Log into your account
            </p>
            <form className='form' action='/graph'>
              <div className='form-group'>
                <input type='text' placeholder='Email Address' name='name' required />
              </div>
              <div className='form-group'>
                <input type='password' placeholder='Password' name='password' />
              </div>
              <div className='form-group'></div>
              <input
                type='submit'
                className='btn btn-primary'
                value='Log In'
              />
            </form>
          </Fragment>
          <div>
            Don't have an account? <Link to='register'>Sign Up</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
