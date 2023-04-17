import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/Home';
import EventList, {getEvents} from './routes/EventList';
import EventDetail, {getEvent} from './routes/EventDetail';
import NewEvent from './routes/NewEvent';
import EditEvent from './routes/EditEvent';
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
              {index: true, element: <EventList/>, loader: getEvents},
              {
                path: ':eventId',
                id: 'event-detail',
                loader: getEvent,
                children: [
                  {index: true, element: <EventDetail/>},
                  {path: 'edit', element: <EditEvent/>}
                ]
              }
            ]
          },
          /*
          {path: '/events', element: <EventList/>, loader: getEvents},
          {path: '/events/:eventId', element: <EventDetail/>, loader: getEvent},
          {path: '/events/:eventId/edit', element: <EditEvent/>, loader: getEvent},
          */
          {path: '/events/new', element: <NewEvent/>}
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router}/>;
};
