import React, { Fragment, useContext, useEffect } from 'react';
import EventItem from './EventItem';
import EventContext from '../../context/event/eventContext';
import Spinner from '../layout/Spinner';

const Events = () => {
  const eventContext = useContext(EventContext);

  const { events, filtered, getEvents, loading } = eventContext;

  useEffect(() => {
    getEvents();
    //eslint-disable-next-line
  }, []);

  if (events.length === 0) {
    return <h4>Please add an event</h4>;
  }
  return (
    <Fragment>
      {events !== null && !loading ? (
        <div>
          {filtered !== null
            ? filtered.map(event => <EventItem key={event._id} event={event} />)
            : events.map(event => <EventItem key={event._id} event={event} />)}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Events;
