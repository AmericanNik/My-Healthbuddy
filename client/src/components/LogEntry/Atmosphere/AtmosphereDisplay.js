import React from 'react';
import './AtmosphereDisplay.css';
import Moment from 'react-moment';

const AtmosphereDisplay = props => {
  Moment.globalFormat = 'D MMM YYYY';

  return (
    <div className='mainDisplay'>
      <div>
        <h2>
          {`Your local atmospheric data for : `}
          <Moment unix>{props.logDate}</Moment>{' '}
        </h2>
      </div>
      <hr />
      <div className='displaySplitContainer'>
        <div className='splitBox'>
          <div className='leftSide'>
            <ul>
              <li>{`Current Weather: ${props.currentSummary}`}</li>
              <li>{`Todays Summary: ${props.dailySummary}`}</li>
              <li>{`Latitude: ${props.latitude}`}</li>
              <li>{`Longitude: ${props.longitude}`}</li>
              <li>{`Pressure: ${props.pressure}`}</li>
            </ul>
          </div>
          <div className='rightSide'>
            <ul>
              <li>{`Moon Phase: ${props.moonPhase}`}</li>
              <li>{`Wind speed: ${props.windSpeed}`}</li>
              <li>{`Humidity: ${props.humidity}`}</li>
              <li>{`DewPoint: ${props.dewPoint}`}</li>
              <li>{`Temperature: ${props.temperature}`}</li>
              <li>{`Ozone: ${props.ozone}`}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtmosphereDisplay;
