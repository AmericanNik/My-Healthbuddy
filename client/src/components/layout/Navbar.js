import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav id='navbar' className='navbar bg-dark '>
      <Link to='/' className='logoLink'>
        <span className='testt animatedhover bounce'></span>Health Buddy
      </Link>
      <ul className='navButtons'>
        <Link to='register' id='signUpLink' className='navSignUp'>
          <li>
            <div>
              <div className='signUpButton'>Sign Up!</div>
            </div>
          </li>
        </Link>
        <Link to='/login' id='loginLink' className='navLogin'>
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
