import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <div className='logoDisplay'>
        <h1 className='logoText'>
          <Link to='/'>
            <span className='testt animatedhover bounce'></span>Health Buddy
          </Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to='/graph'>Home</Link>
        </li>
        <li>
          <Link to='/app'>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
