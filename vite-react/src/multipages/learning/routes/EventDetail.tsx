import {json, useLoaderData} from 'react-router-dom';
import {sendRequest} from '../../../hooks/use-http';

export default function EventDetail() {
  const {id, title, description} = useLoaderData() as { id: number, title: string, description: string };

  return (
    <>
      <h1>{id} - {title}</h1>
      <p>{description}</p>
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
