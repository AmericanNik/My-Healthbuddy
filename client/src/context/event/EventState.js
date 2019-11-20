import React, { useReducer } from 'react';
import axios from 'axios';
import EventContext from './eventContext';
import eventReducer from './eventReducer';
import {
  ADD_EVENT,
  DELETE_EVENT,
  SET_CURRENT_EVENT,
  CLEAR_CURRENT_EVENT,
  UPDATE_EVENT,
  FILTER_EVENT,
  CLEAR_EVENT_FILTER,
  EVENT_ERROR,
  GET_EVENTS
} from '../types';

const EventState = props => {
  const initialState = {
    events: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(eventReducer, initialState);

  //Get Events

  const getEvents = async () => {
    try {
      const res = await axios.get('api/events');
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //Add Event

  const addEvent = async event => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/events/', event, config);
      dispatch({ type: ADD_EVENT, payload: res.data });
    } catch (err) {
      dispatch({ type: EVENT_ERROR, payload: err.response.msg });
    }
  };

  //Delete Event
  const deleteEvent = id => {
    dispatch({ type: DELETE_EVENT, payload: id });
  };
  //Set Current Event
  const setCurrentEvent = contact => {
    dispatch({ type: SET_CURRENT_EVENT, payload: contact });
  };

  //Clear Current Event
  const clearCurrentEvent = contact => {
    dispatch({ type: CLEAR_CURRENT_EVENT });
  };
  //Update Event
  const updateEvent = event => {
    dispatch({ type: UPDATE_EVENT, payload: event });
  };

  //Filter Events

  const filterEvents = text => {
    dispatch({ type: FILTER_EVENT, payload: text });
  };

  //Clear Event Filter

  const clearEventFilter = () => {
    dispatch({ type: CLEAR_EVENT_FILTER });
  };

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addEvent,
        deleteEvent,
        setCurrentEvent,
        clearCurrentEvent,
        updateEvent,
        filterEvents,
        clearEventFilter,
        getEvents
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
