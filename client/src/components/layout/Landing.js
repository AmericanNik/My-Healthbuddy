import React from 'react';
import { Link } from 'react-router-dom';
import ConditionSearchBar from '../conditionSearchBar/ConditionSearchBar';
import './Landing.css';

class Landing extends React.Component {
  render() {
    return (
      <div className='mainContain'>
        <section className='landing'>
          <div>
            <div className=' mainArea'>
              <div className='container landing-inner '>
                <h1 className='x-large'>Health Buddy</h1>
                <p className='lead'>Helping you take control of your health!</p>
                <div className='buttons'>
                  <Link
                    to='register'
                    className=' ui button red large'
                    style={{ backgroundColor: `#dc3545` }}
                  >
                    Sign Up
                  </Link>
                  <Link to='/login' className=' ui button large'>
                    Login
                  </Link>
                </div>
                <ConditionSearchBar
                  headline={'Search Conditions To Start Tracking Your Health:'}
                  buttonIntro={'Track Your '}
                  buttonOutro={'Join Healthbuddy Today Free!'}
                  linkTo={'/register'}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Landing;
