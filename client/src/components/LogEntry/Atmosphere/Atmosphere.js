import React, { useState, useEffect, useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext';
import Alerts from '../../../components/layout/Alerts';
import AtmosphereDisplay from './AtmosphereDisplay';
import axios from 'axios';
import WeatherAPI from './WeatherAPI';
import ZipApi from './ZipAPI';
import './Atmosphere.css';
import ZipAPI from './ZipAPI';

const Atmosphere = props => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const [logLocation, setLogLocation] = useState({
    addLocation: true,
    zipcode: '',
    zipcodeSearched: '',
    latitude: '',
    saveLat: '',
    saveLong: '',
    longitude: '',
    accuracy: '',
    currentSummary: '',
    dailySummary: '',
    icon: '',
    temperature: '',
    dewPoint: '',
    humidity: '',
    pressure: '',
    ozone: '',
    windSpeed: '',
    moonPhase: '',
    logDate: '',
    dataSent: 0
  });

  const {
    zipcode,
    latitude,
    longitude,
    accuracy,
    currentSummary,
    dailySummary,
    icon,
    temperature,
    dewPoint,
    humidity,
    pressure,
    ozone,
    windSpeed,
    moonPhase,
    logDate,
    dataSent,
    zipcodeSearched,
    saveLat,
    saveLong
  } = logLocation;

  const onChange = e => {
    setLogLocation({ ...logLocation, [e.target.name]: e.target.value });
  };

  const sendAtmosphereData = async () => {
    await props.returnCurrentSummary(
      currentSummary,
      dailySummary,
      longitude,
      latitude,
      pressure,
      ozone,
      moonPhase,
      windSpeed,
      humidity,
      dewPoint,
      temperature,
      logDate,
      dataSent
    );
  };

  //USE EFFECT

  useEffect(() => {
    console.log('Use Effect was used!');
    // eslint-disable-next-line
    console.log('accuracy: ' + accuracy);
    console.log('dataSent: ' + dataSent);

    if (accuracy !== '' && dataSent <= 0) {
      sendAtmosphereData();
      setLogLocation({ ...logLocation, dataSent: dataSent + 1 });
    }
  }, props.history);

  //  AREA CODE CALL

  const zipTest = new RegExp('^[a-z0-9][a-z0-9- ]{0,10}[a-z0-9]$');

  const zipGrabClicked = async e => {
    console.log(zipcode);

    if (!zipcode) {
      return setAlert('Zipcode cannot be empty', 'secondary');
    }

    if (!zipTest.test(zipcode)) {
      return setAlert('Please enter valid zipcode format', 'secondary');
    }
    if (zipcode === accuracy) {
      setLogLocation({
        ...logLocation,
        latitude: saveLat,
        longitude: saveLong
      });
      return console.log('Already have data for this zipcode');
    }
    console.log('---------------------');
    if (zipTest.test(zipcode)) {
      console.log('Passed!');

      const response = await ZipAPI.get(`/${zipcode}/degrees`);
      console.log(response);
      setLogLocation({
        ...logLocation,
        latitude: response.data.lat,
        longitude: response.data.lng
      });
      getWeatherData(response.data.lat, response.data.lng, zipcode);
    } else {
      console.log('Enter a valid zipcode!');
    }
    console.log('clicked!');
    let latitude = 'Lat';
    let longitude = 'Long';
  };

  // RETURNS POSITION

  const returnPosition = position => {
    console.log(position.coords.accuracy.toString(), accuracy.toString());
    console.log(position);
    if (position.coords.accuracy.toString() == accuracy) {
      console.log('stopped another call and just placed lat/long back');
      setLogLocation({
        ...logLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        dataSent: 1
      });
    } else {
      getWeatherData(
        position.coords.latitude,
        position.coords.longitude,
        position.coords.accuracy
      );
    }
  };

  //  AUTOMATICALLY GTAB DATA BUTTON

  const autoGrabClicked = async e => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(returnPosition);
    } else {
      console.log('naviagtor failed');
    }
  };
  //  CLEAR LOCATION BUTTON ACTION
  const clearLocation = () => {
    setLogLocation({ ...logLocation, latitude: '', longitude: '' });
    props.returnDataSent(0);
  };

  //  GET ATMOSPHERIC DATA

  const getWeatherData = async (lat, long, accur) => {
    if (accur === accuracy) {
      return console.log('STOP THE PRESSES');
    }
    const response = await WeatherAPI.get(`/${lat},${long}`);

    console.log(response);

    setLogLocation({
      ...logLocation,
      latitude: lat,
      longitude: long,
      saveLat: lat,
      saveLong: long,
      accuracy: accur,
      currentSummary: response.data.currently.summary,
      dailySummary: response.data.daily.summary,
      icon: response.data.currently.icon,
      temperature:
        (response.data.daily.data[0].temperatureHigh +
          response.data.daily.data[0].temperatureLow) /
        2,
      pressure: response.data.daily.data[0].pressure,
      dewPoint: response.data.daily.data[0].dewPoint,
      humidity: response.data.daily.data[0].humidity,
      pressure: response.data.daily.data[0].pressure,
      ozone: response.data.daily.data[0].ozone,
      windSpeed: response.data.daily.data[0].windSpeed,
      moonPhase: response.data.daily.data[0].moonPhase,
      logDate: response.data.daily.data[0].time
    });
  };

  return (
    <div className='atmosphereContainer'>
      <h3 className='atmosphereHead'>Add Atmospheric Data!</h3>

      {latitude === '' ? (
        <div className='splitBox'>
          <div className='leftSide'>
            <div className='zipContainer ui massive input'>
              <input
                className='zipInput'
                placeholder='Search Zipcode'
                type='text'
                name='zipcode'
                onChange={onChange}
              />
            </div>
            <div
              name='zipGrab'
              htmlFor='zipGrab'
              className='getAtmoButton'
              onClick={zipGrabClicked}
            >
              {'Get Data By Zipcode'}
            </div>
            <Alerts />
          </div>
          <div className='theOr'>Or</div>
          <div className='rightSide'>
            <div>
              <div>
                <div>
                  <div className='autoGrabButton' onClick={autoGrabClicked}>
                    <div className='shortAuto'>{'Auto'}</div>
                    {'Get Data '}
                    <span className='longAuto'>{'Automatically'}</span>
                  </div>
                  <p>
                    {
                      'We will ask for location permission. If you accidentally say no you can simply reactivate your browsers location sharing setting'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='autoGrabButton' onClick={clearLocation}>
            <div className='shortAuto'>{'Auto'}</div>
            {'Delete Data'}
          </div>
        </div>
      )}
      <div>
        {latitude === '' ? (
          <div></div>
        ) : (
          <div>
            <AtmosphereDisplay
              currentSummary={currentSummary}
              dailySummary={dailySummary}
              longitude={longitude}
              latitude={latitude}
              pressure={pressure}
              ozone={ozone}
              moonPhase={moonPhase}
              windSpeed={windSpeed}
              humidity={humidity}
              dewPoint={dewPoint}
              temperature={temperature}
              logDate={logDate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Atmosphere;
