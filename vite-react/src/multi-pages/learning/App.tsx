import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '@/multi-pages/learning/routes/home/Home';
import SuspenseLoading from '@/components/loading/SuspenseLoading';

const Tour = React.lazy(() => import('@/multi-pages/learning/routes/tour/Tour'));
const Grid = React.lazy(() => import('@/multi-pages/learning/routes/grid/Grid'));

const router = createHashRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
      { path: 'tour', element: <SuspenseLoading><Tour /></SuspenseLoading> },
      { path: 'grid', element: <SuspenseLoading><Grid /></SuspenseLoading> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
};
