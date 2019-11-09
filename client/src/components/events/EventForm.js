import React, { useState, useContext, useEffect } from 'react';
import EventContext from '../../context/event/eventContext';

const EventForm = () => {
  const eventContext = useContext(EventContext);

  const { addEvent, current, clearCurrentEvent, updateEvent } = eventContext;

  const clearAll = () => {
    clearCurrentEvent();
  };

  useEffect(() => {
    if (current !== null) {
      setEvent(current);
    } else {
      setEvent({
        eventName: '',
        startTime: '',
        endTime: '',
        description: '',
        type: 'personal'
      });
    }
  }, [eventContext, current]);

  const [event, setEvent] = useState({
    eventName: '',
    startTime: '',
    endTime: '',
    description: '',
    type: 'personal'
  });

  const { eventName, startTime, endTime, description, type } = event;

  const onChange = e => setEvent({ ...event, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addEvent(event);
    } else {
      updateEvent(event);
    }
    setEvent({
      eventName: '',
      startTime: '',
      endTime: '',
      description: '',
      type: 'personal'
    });

    clearAll();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Event' : 'Add Event'}</h2>
      <input
        type='text'
        placeholder='Event Name'
        name='eventName'
        value={eventName}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Start Time/Date'
        name='startTime'
        value={startTime}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Event end time/date'
        name='endTime'
        value={endTime}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <h5>Event Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update Event' : 'Add Event'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default EventForm;
