import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav id='navbar' className='navbar bg-dark '>
      <Link to='/' id='navLogoLink' className='logoLink'>
        <span className='testt animatedhover bounce'></span>
        <span className='healthbuddyLogoName'>HealthBuddy</span>
      </Link>
      <ul className='navButtons'>
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
      </ul>
    </nav>
  );
};

export default Navbar;
