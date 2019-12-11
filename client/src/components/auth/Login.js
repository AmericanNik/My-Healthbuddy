import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    // Changes CSS Class In Nav to active.
    const v = document.getElementById('navLoginLink');
    v.className += ' currentPage';
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    const v = document.getElementById('navLoginLink');
    v.className = v.className.substring(0, v.className.length - 12);
  }
  //  Captures input and sets as state
  onEmailChange = async event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = async event => {
    this.setState({ password: event.target.value });
  };

  render() {
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
                <p>
                  {this.state.passwordValid === 'true' ? (
                    <span>Passed!</span>
                  ) : (
                    <span>Failed!</span>
                  )}
                </p>
                <p>{this.state.email}</p>
                <p>{this.state.password}</p>
                <form className='form' action='/graph'>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Email Address'
                      name='name'
                      onChange={this.onEmailChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      placeholder='Password'
                      onChange={this.onPasswordChange}
                      name='password'
                    />
                  </div>
                  <div className='form-group'></div>
                  <input
                    type='submit'
                    className='ui fluid button red large'
                    value='Log In'
                    onClick={this.submitLogin}
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
  }
}

export default Login;
