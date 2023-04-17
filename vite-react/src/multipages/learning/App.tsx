import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/Home';
import EventList, {loadEvents} from './routes/EventList';
import EventDetail, {deleteEvent, loadEvent} from './routes/EventDetail';
import NewEvent from './routes/NewEvent';
import EditEvent, {updateEvent} from './routes/EditEvent';
import Root from './routes/Root';
import EventNavigation from './components/EventNavigation';
import ErrorPage from './routes/ErrorPage';

const router = createHashRouter([
  {
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {path: '/', element: <Home/>},
      {
        element: <EventNavigation/>,
        children: [
          {
            path: '/events',
            children: [
              {index: true, element: <EventList/>, loader: loadEvents},
              {
                path: ':eventId',
                id: 'event-detail',
                loader: loadEvent,
                children: [
                  {index: true, element: <EventDetail/>, action: deleteEvent},
                  {path: 'edit', element: <EditEvent/>, action: updateEvent}
                ]
              }
            ]
          },
          {path: '/events/new', element: <NewEvent/>}
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router}/>;
};
