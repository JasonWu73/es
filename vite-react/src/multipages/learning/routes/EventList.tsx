import {Link, useLoaderData} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {sendRequest, useHttp} from '../../../hooks/use-http';

export default function EventList() {
  const [data, error] = useLoaderData() as [data: {
    products: { id: number, title: string }[]
  }, error: string];

  const events = data?.products;

  return (
    <>
      {error && <p>{error}</p>}
      {!error &&
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

  /*
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
  */
};

export async function getEvents() {
  const [data, error] = await sendRequest({
    method: 'get',
    url: 'https://dummyjson.com/products'
  });
  return [data, error];
}

function useEvents() {
  const {loading, error, sendRequest} = useHttp();
  const [events, setEvents] = useState<{ id: number, title: string }[]>();

  useEffect(
    () => {
      const controller = sendRequest(
        {
          method: 'get',
          url: 'https://dummyjson.com/products'
        },
        data => setEvents(data.products)
      );

      return () => controller.abort();
    },
    []
  );

  return {loading, error, events};
}
