import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/Home';
import EventList, {loadEvents} from './routes/EventList';
import EventDetail, {deleteEvent, loadEvent} from './routes/EventDetail';
import NewEvent from './routes/NewEvent';
import EditEvent, {updateEvent} from './routes/EditEvent';
import MyLayout from './routes/MyLayout';
import EventNavigation from './components/EventNavigation';
import ErrorPage from '../../components/error/ErrorPage';
import Login from '../../routes/auth/Login';
import Root from '../../routes/Root';

const router = createHashRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        element: <MyLayout/>,
        children: [
          {index: true, element: <Home/>},
          {
            element: <EventNavigation/>,
            children: [
              {
                path: 'events',
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
                  },
                  {path: 'new', element: <NewEvent/>}
                ]
              }
            ]
          }
        ]
      },
      {path: 'login', element: <Login/>}
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router}/>;
};
