import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/home/Home';
import SuspenseLoading from '@/components/loading/SuspenseLoading';

const Natours = React.lazy(() => import('./routes/natours/Natours'));

const router = createHashRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
      {
        path: 'natours',
        element: <SuspenseLoading><Natours /></SuspenseLoading>
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
};
