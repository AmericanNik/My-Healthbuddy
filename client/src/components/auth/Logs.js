import React, { Fragment, useState, Component, Redirect } from 'react';
import './Logs.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import API from "../../utils/API";
import StateList from '../../utils/states.json';
require('dotenv').config()

let ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Logs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logEntry: '',
      logTime: Date.now(),
      city: '',
      stateAbbr: '',
      dailyWellbeing: "",
      activity: "",
      temperature: "",
      humidity: ""
    };
  }
  getZip = () => {
    axios.get(`https://www.zipcodeapi.com/rest/${process.env.zipCodeAPIKey}/city-zips.json/${this.state.city}/${this.state.stateAbbr}`)
      .then(function (res) {
        console.log(res);
      })
  }

  onLogEntryChange = async event => {
    console.log(this.state.logEntry);
    this.setState({ logEntry: event.target.value });
    const d = new Date();
    this.setState({ logTime: d.toString() });
  };

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
  handleWellBeingChange = event => {
    this.setState({
      dailyWellbeing: event.target.value
    });
  };
  handleActivityChange = event => {
    this.setState({
      activity: event.target.value
    });
  };

  handleLogSubmit = () => {
    this.getZip();
    // API.createLog();
  }

  render() {
    return (
      <div className='container'>
        <div className='logContainer'>
          <Fragment>
            <h1 className='large text-primary'>How did you do today?</h1>
            <div>
              <div>
                {this.state.logEntry !== '' ? (
                  <div className='screenJournal'>
                    <h5>{this.state.logTime}</h5>
                    <h4 className='journalHeader'> Dear HealthBuddy...</h4>
                    <p className='journalEntry'>{this.state.logEntry}</p>
                  </div>
                ) : (
                    <div></div>
                  )}
              </div>
            </div>
            {/* <form className='form' action='/graph'> */}
            <form className='form'>
              <div className='form-group'>
                <textarea
                  className='logEntry'
                  type='text'
                  value={this.state.logEntry}
                  placeholder='Dear HealthBuddy, today was...'
                  name='name'
                  onChange={this.onLogEntryChange}
                  required
                />
              </div>
              <h2>Well-Being</h2>
              <p>On a scale of 1-10, how did you feel today?</p>
              <select
                value={this.state.wellBeing}
                onChange={this.handleWellBeingChange}
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
                value={this.state.activity}
                onChange={this.handleActivityChange}
              >
                {ratings.map(function (num, index) {
                  return <Fragment key={`Activity ${index}`}>
                    <option value={num}>{num}</option>
                  </Fragment>
                })}
              </select>
              <h2>Location</h2>
              <p>Where were you today?</p>
              <form>
                <textarea
                  type='text'
                  placeholder="City Name"
                  value={this.state.city}
                  onChange={this.handleCityChange}
                  required
                />
                City
              </form>
              <form>
                <select
                  value={this.state.stateAbbr}
                  onChange={this.handleStateChange}
                >
                  {StateList.map(function (item, index) {
                    return <Fragment key={`StateList ${index}`}>
                      <option value={item.abbreviation}>{item.name}</option>
                    </Fragment>
                  })}
                </select>
                <label>State</label>
              </form>

              <input
                type='submit'
                className='btn btn-primary logSubmit'
                value='Submit Log'
                onClick={this.handleLogSubmit}
              />
            </form>
          </Fragment>
        </div>
      </div>
    );
  }
}

export default Logs;
