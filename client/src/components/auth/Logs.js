import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Logs = () => {
  return (
    <Fragment>
      <h1 className="large text-primary">How did you feel today?</h1>
      <p className="lead"><i className="fa fa-ambulance"></i></p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input type="text" placeholder="Dear Health Buddy, today was..." name="name" required />
        </div>
        <p>Activity</p>
        <form>
          <input type="number" min="1" max="10" />
        </form>
        <p>Severity</p>
        <form>
          <input type="number" min="1" max="10" />
        </form>
          <input type="submit" className="btn btn-primary" value="Submit" />

        </form>
    </Fragment>
      )
    }
    
export default Logs