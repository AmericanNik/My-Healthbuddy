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
        <div className="form-group">
          <input type="text" placeholder="Condition Dropdown?" name="name" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="THIS WILL BE A SLIDER FOR ACTIVITY" name="name" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="THIS WILL BE A SLIDER FOR FEELING" name="name" required />
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />

  </form>
    </Fragment>
            )
        }
                               
export default Logs