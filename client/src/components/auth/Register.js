import React, { Fragment, useState } from 'react';
import Graph from '../../components/graph/graph';
import { Link, Redirect } from 'react-router-dom';
import { PromiseProvider } from 'mongoose';
import ValidationBox from './ValidationBox';
import API from './API';
import axios from 'axios';
import './Register.css';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      validPassword: false
    };

    this.submitUser = async event => {
      event.preventDefault();

      //basic password validation
      var strongRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
      );

      if (
        strongRegex.test(this.state.password) &&
        this.state.password === this.state.confirmPassword
      ) {
        let payload = {
          name: this.state.userName,
          email: this.state.email,
          password: this.state.password
        };

        const response = await API.post('/api/v1/auth/register', {
          ...payload
        })
          .then(response => console.log(response))
          .catch(err => console.log(err));
        console.log(response);
      } else {
        console.log('PASSWORD IS NOT UP TO SNUFF');
      }
    };
  }

  componentDidMount() {
    const v = document.getElementById('NavSignUpLink');
    v.className += ' currentPage';
  }

  componentWillUnmount() {
    const v = document.getElementById('NavSignUpLink');
    v.className = v.className.substring(0, v.className.length - 12);
  }

  onNameChange = async event => {
    this.setState({ userName: event.target.value });
  };
  onEmailChange = async event => {
    this.setState({ email: event.target.value });
  };
  onFirstPasswordChange = async event => {
    this.setState({ password: event.target.value });
  };
  onConfirmPasswordChange = async event => {
    this.setState({ confirmPassword: event.target.value });
  };

  passValid = isValidAnswer => {
    this.isValid = isValidAnswer;
    console.log(isValidAnswer);
  };

  validationBox = () => {
    if (this.validationSwitch.lowerPass === true) {
      return (
        <span className='fail'>
          <i className='fas fa-check'></i>At least 1 lower case!
        </span>
      );
    } else {
      return (
        <span className='pass'>
          <i className='fas fa-times'></i>Does not have 1 lower case character.
        </span>
      );
    }
  };

  render() {
    return (
      <div className='landing'>
        <div className='mainArea'>
          <Fragment>
            <div className='container landing-inner'>
              <h1 className='large text-primary'>Sign Up</h1>
              <p className='lead'>
                <i className='fas fa-user'></i> Create Your Account
              </p>
              <ul>
                <li>
                  {this.state.userName !== '' ? (
                    <span>Name: {this.state.userName}</span>
                  ) : (
                    <span></span>
                  )}
                </li>
                <li>
                  {this.state.email !== '' ? (
                    <span>Email: {this.state.email}</span>
                  ) : (
                    <span></span>
                  )}
                </li>
                <li>
                  {this.state.password !== '' ? (
                    <span>Password: {this.state.password}</span>
                  ) : (
                    <span></span>
                  )}
                </li>
                <li>
                  {this.state.confirmPassword !== '' ? (
                    <span>
                      Confirmed Password: {this.state.confirmPassword}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </li>
              </ul>
              <form className='form' action='/graph'>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Name'
                    value={this.state.userName}
                    name='name'
                    required
                    onChange={this.onNameChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    value={this.state.email}
                    onChange={this.onEmailChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onFirstPasswordChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    name='password2'
                    value={this.state.confirmPassword}
                    onChange={this.onConfirmPasswordChange}
                  />
                </div>
                <ValidationBox
                  password={this.state.password}
                  confirmPassword={this.state.confirmPassword}
                  passValid={this.passValid}
                />

                <input
                  type='submit'
                  className='ui fluid button red large'
                  value='Register'
                  onClick={this.submitUser}
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
  }
}

export default Register;
