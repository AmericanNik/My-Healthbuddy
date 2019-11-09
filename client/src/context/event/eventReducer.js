import {
  ADD_EVENT,
  DELETE_EVENT,
  SET_CURRENT_EVENT,
  CLEAR_CURRENT_EVENT,
  UPDATE_EVENT,
  FILTER_EVENT,
  CLEAR_EVENT_FILTER,
  CONTACT_ERROR,
  GET_EVENTS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
        loading: false
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    case SET_CURRENT_EVENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT_EVENT:
      return {
        ...state,
        current: null
      };
    case FILTER_EVENT:
      return {
        ...state,
        filtered: state.events.filter(event => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return event.eventName.match(regex) || event.description.match(regex);
        })
      };
    case CLEAR_EVENT_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
