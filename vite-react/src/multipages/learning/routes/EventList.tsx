import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useHttp} from '../../../hooks/use-http';


export default function EventList() {
  const {loading, error, events} = useEvents();

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && events &&
        <ul>
          {events.map(event =>
            <li key={event.id}>
              <Link to={event.id + ''}>{event.title}</Link>
            </li>
          )}
        </ul>
      }
    </>
  );
};

function useEvents() {
  const {loading, error, sendRequest} = useHttp();
  const [events, setEvents] = useState<{ id: number, title: string }[]>();

  useEffect(
    () => {
      sendRequest(
        {
          method: 'get',
          url: 'https://dummyjson.com/products'
        },
        data => setEvents(data.products)
      );
    },
    []
  );

  return {loading, error, events};
}
