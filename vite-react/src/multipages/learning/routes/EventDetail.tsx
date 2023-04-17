import {useParams} from 'react-router-dom';

export default function EventDetail() {
  const {eventId} = useParams();

  return (
    <>
      <h1>Event Detail</h1>
      <p>Event ID: {eventId}</p>
    </>
  );
};
