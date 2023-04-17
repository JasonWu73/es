import {json, Link, useRouteLoaderData} from 'react-router-dom';
import {sendRequest} from '../../../hooks/use-http';

export default function EventDetail() {
  const {id, title, description} = useRouteLoaderData('event-detail') as {
    id: number,
    title: string,
    description: string
  };

  return (
    <>
      <h1>{id} - {title}</h1>
      <p>{description}</p>
      <footer style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem'}}>
        <Link to="edit">Edit</Link>
        <a>Delete</a>
      </footer>
    </>
  );
};

export async function getEvent({params}: { params: object }) {
  const [data, error] = await sendRequest({
    method: 'get',
    url: `https://dummyjson.com/products/${(params as { eventId: number }).eventId}`
  });

  if (error) {
    throw json(
      {error},
      {status: 500}
    );
  }

  return data;
}
