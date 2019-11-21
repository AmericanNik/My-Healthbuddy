import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Symptoms = () => {
    return (
    <Fragment>
      <h1 className="large text-primary">What are your symptoms</h1>
      <p className="lead"><i className="fa fa-ambulance"></i></p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input type="text" placeholder="Symptom name?" name="name" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Describe what is happening" name="name" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="THIS WILL BE A SLIDER" name="name" required />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />

  </form>
    </Fragment>
            )
        }
                               
export default Symptoms