import React, { Fragment, useState } from 'react';
import Graph from '../../components/graph/graph';
import { Link, Redirect } from 'react-router-dom';
import { PromiseProvider } from 'mongoose';

const Register = () => {
  const [formData, setFormData] = useState({
    toGraph: true,
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const handleClick = () => {
    return <Redirect to='/graph' />;
  };

  const { name, email, password, password2 } = formData;

  return (
    <div className='landing'>
      <div className='mainArea'>
        <Fragment>
          <div className='container landing-inner'>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
              <i className='fas fa-user'></i> Create Your Account
            </p>
            <form className='form' action='/graph'>
              <div className='form-group'>
                <input type='text' placeholder='Name' name='name' required />
              </div>
              <div className='form-group'>
                <input type='email' placeholder='Email Address' name='email' />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  minLength='6'
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  name='password2'
                  minLength='6'
                />
              </div>
              <input
                type='submit'
                className='btn btn-primary'
                value='Register'
                onClick={handleClick}
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
};

// return (
//   <Fragment>
//     <h1 className='large text-primary'>Sign Up</h1>
//     <p className='lead'>
//       <i className='fas fa-user'></i> Create Your Account
//     </p>
//     <form className='form' action='create-profile.html'>
//       <div className='form-group'>
//         <input type='text' placeholder='Name' name='name' required />
//       </div>
//       <div className='form-group'>
//         <input type='email' placeholder='Email Address' name='email' />
//       </div>
//       <div className='form-group'>
//         <input
//           type='password'
//           placeholder='Password'
//           name='password'
//           minLength='6'
//         />
//       </div>
//       <div className='form-group'>
//         <input
//           type='password'
//           placeholder='Confirm Password'
//           name='password2'
//           minLength='6'
//         />
//       </div>
//       <input type='submit' className='btn btn-primary' value='Register' />
//     </form>
//     <p className='my-1'>
//       Already have an account? <Link to='/login'>Sign in</Link>
//     </p>
//   </Fragment>
// );

export default Register;
