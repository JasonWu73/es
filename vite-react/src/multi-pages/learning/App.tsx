import React from 'react';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from '@/multi-pages/learning/routes/home/Home';
import SuspenseLoading from '@/components/loading/SuspenseLoading';
import Root from '@/multi-pages/learning/Root';

const RouteError = React.lazy(() => import('@/components/error/RouteError'));
const Tour = React.lazy(() => import('@/multi-pages/learning/routes/tour/Tour'));
const Grid = React.lazy(() => import('@/multi-pages/learning/routes/grid/Grid'));
const Learning = React.lazy(() => import('@/multi-pages/learning/routes/learning/Learning'));

const router = createHashRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <SuspenseLoading><RouteError/></SuspenseLoading>,
    children: [
      {index: true, element: <Home/>},
      {path: 'tour', element: <SuspenseLoading><Tour/></SuspenseLoading>},
      {path: 'grid', element: <SuspenseLoading><Grid/></SuspenseLoading>},
      {path: 'learning', element: <SuspenseLoading><Learning/></SuspenseLoading>}
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router}/>;
};
