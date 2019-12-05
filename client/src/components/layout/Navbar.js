import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <div className='logoDisplay'>
        <h1 className='logoText'>
          <Link to='/'>
            <span className='testt'></span>Health Buddy
          </Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to='register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
