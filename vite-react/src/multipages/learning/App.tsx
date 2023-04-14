import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/Home';
import ProductList from './routes/ProductList';
import NewProduct from './routes/NewProduct';
import ProductDetail from './routes/ProductDetail';
import Root from './routes/Root';

const router = createHashRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {path: '/', element: <Home/>},
      {path: '/products', element: <ProductList/>},
      {path: '/products/:id', element: <ProductDetail/>},
      {path: '/products/new', element: <NewProduct/>}
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router}/>;
}
