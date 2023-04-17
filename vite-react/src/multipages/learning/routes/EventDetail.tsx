import {json, Link, redirect, useRouteLoaderData, useSubmit} from 'react-router-dom';
import {sendRequest} from '../../../hooks/use-http';
import React from 'react';

export default function EventDetail() {
  const {id, title, description} = useRouteLoaderData('event-detail') as {
    id: number,
    title: string,
    description: string
  };
  const submit = useSubmit();

  function handleDelete(event: React.MouseEvent) {
    event.preventDefault();

    const confirmed = window.confirm('Are you sure delete event?');
    if (!confirmed) return;

    submit(null, {method: 'delete'});
  }

  return (
    <>
      <h1>{id} - {title}</h1>
      <p>{description}</p>
      <footer style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem'}}>
        <Link to="edit">Edit</Link>
        <a href="" onClick={handleDelete}>Delete</a>
      </footer>
    </>
  );
};

export async function loadEvent({params}: { params: object }) {
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

export async function deleteEvent({params}: { params: any, request: Request }) {
  const [data, error] = await sendRequest({
    method: 'delete',
    url: `https://dummyjson.com/products/${params.eventId}`
  });

  if (error) {
    throw json(
      {error},
      {status: 500}
    );
  }

  console.log('delete event: ', data);
  return redirect('/events');
}
