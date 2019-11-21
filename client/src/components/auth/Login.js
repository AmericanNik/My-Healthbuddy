import React, { Fragment, useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password, } = formData;

    return (
        <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" />
        </div>
        <div className="form-group">
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
        </Fragment>
    )
}

export default Login