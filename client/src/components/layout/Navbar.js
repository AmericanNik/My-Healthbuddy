import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <Link to='/dashboard' id='NavLogoutLink' className='navSignUp'>
        <li>
          <div>
            <div className='signUpButton'>Account</div>
          </div>
        </li>
      </Link>
      <a
        to='!#'
        href='logout'
        onClick={onLogout}
        id='navLogout'
        className='navLogin'
      >
        <li>
          <div>
            <div className='loginButton'>Logout</div>
          </div>
        </li>
      </a>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to='register' id='NavSignUpLink' className='navSignUp'>
        <li>
          <div>
            <div className='signUpButton'>Register</div>
          </div>
        </li>
      </Link>
      <Link to='/login' id='navLoginLink' className='navLogin'>
        <li>
          <div>
            <div className='loginButton'>Login</div>
          </div>
        </li>
      </Link>
    </Fragment>
  );

  return (
    <nav id='navbar' className='navbar bg-dark '>
      <Link to='/' id='navLogoLink' className='logoLink'>
        <span className='testt animatedhover bounce'></span>
        <span className='healthbuddyLogoName'>HealthBuddy</span>
      </Link>
      <ul className='navButtons'>{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
};

export default Navbar;
