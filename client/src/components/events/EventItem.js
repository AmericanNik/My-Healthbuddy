import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EventContext from '../../context/event/eventContext';

const EventItem = ({ event }) => {
  const eventContext = useContext(EventContext);

  const { deleteEvent, setCurrentEvent, clearCurrentEvent } = eventContext;
  const { eventName, id, startTime, endTime, description, type } = event;

  const onDelete = () => {
    deleteEvent(id);
    clearCurrentEvent();
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {eventName}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>{' '}
      </h3>
      <ul className='list'>
        {startTime && (
          <li>
            <i className='fas fa-envelope-open'></i> {startTime}
          </li>
        )}
        {endTime && (
          <li>
            <i className='fas fa-envelope-open'></i> {endTime}
          </li>
        )}
        {description && (
          <li>
            <i className='fas fa-envelope-open'></i> {description}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrentEvent(event)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventItem;
