import React, { Fragment, useState, Component } from 'react';
import { Link } from 'react-router-dom';



class Logs extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      stateAbbr: ""
    }
  }

  handleChange = event => {
    this.setState({
      city: event.target.value,
      stateAbbr: event.target.value
    })
  }

  render() {
    return (
      <Fragment>
        <h1 className="large text-primary">How did you feel today?</h1>
        <p className="lead"><i className="fa fa-ambulance"></i></p>
        <form className="form" action="create-profile.html">
          <div className="form-group">
            <input type="text" placeholder="Dear Health Buddy, today was..." name="name" required />
          </div>
          <h2>Well-Being</h2>
          <p>On a scale of 1-10, how did you feel today?</p>
          <form>
            <input type="number" min="1" max="10" />
          </form>
          <h2>Activity</h2>
          <p>On a scale of 1-10, how active were you today?</p>
          <form>
            <input type="number" min="1" max="10" />
          </form>
          <h2>Location</h2>
          <p>Where were you today?</p>
          <form>
            <input type="text" value={this.state.city} onChange={this.handleChange} />City
          </form>
          <form>
            <input type="text" value={this.state.stateAbbr} onChange={this.handleChange} />State Abbreviation
          </form>

          <input type="submit" className="btn btn-primary logSubmit" value="Submit" />

        </form>
      </Fragment>

    )
  }
}


export default Logs