import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <Fragment>
          <div className='container displayContainer'>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
              <i className='fas fa-user'></i> Create Your Account
            </p>
            <form className='form' action='create-profile.html'>
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
