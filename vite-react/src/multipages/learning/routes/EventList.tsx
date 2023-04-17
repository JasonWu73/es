import {Link} from 'react-router-dom';

const DUMMY_EVENTS: { id: number, title: string }[] = [
  {id: 1, title: 'iPhone 9'},
  {id: 2, title: 'iPhone 10'}
];

export default function EventList() {
  return (
    <>
      <h1>Event List</h1>
      <ul>
        {DUMMY_EVENTS.map(event =>
          <li key={event.id}>
            <Link to={event.id + ''}>{event.title}</Link>
          </li>
        )}
      </ul>
    </>
  );
};
