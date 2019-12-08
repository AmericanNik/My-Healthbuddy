import React, { Fragment, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import StateList from '../../utils/states.json';

class Logs extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      stateAbbr: ''
    };
  }

  handleCityChange = event => {
    this.setState({
      city: event.target.value
    });
  };
  handleStateChange = event => {
    this.setState({
      stateAbbr: event.target.value
    });
  };

  render() {
    return (
      <div className='container'>
        <Fragment>
          <h1 className='large text-primary'>How did you feel today?</h1>
          <form className='form' action='create-profile.html'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Dear Health Buddy, today was...'
                name='name'
                required
              />
            </div>
            <h2>Well-Being</h2>
            <p>On a scale of 1-10, how did you feel today?</p>
            <select>
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
            <select>
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
            <form>
              <input
                type='text'
                value={this.state.city}
                onChange={this.handleCityChange}
              />
              City
            </form>
            <form>
              <select
                value={this.state.value}
                onChange={this.handleStateChange}
              >
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
            </form>

            <input
              type='submit'
              className='btn btn-primary logSubmit'
              value='Submit'
            />
          </form>
        </Fragment>
      </div>
    );
  }
}

export default Logs;
