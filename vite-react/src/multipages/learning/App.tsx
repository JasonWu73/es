import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/Home';
import EventList, {getEvents} from './routes/EventList';
import EventDetail from './routes/EventDetail';
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
            element: <EventList/>,
            loader: getEvents
          },
          {path: '/events/:eventId', element: <EventDetail/>},
          {path: '/events/:eventId/edit', element: <EditEvent/>},
          {path: '/events/new', element: <NewEvent/>}
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router}/>;
};
