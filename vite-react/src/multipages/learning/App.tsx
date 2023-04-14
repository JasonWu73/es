import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/Home';
import ProductList from './routes/ProductList';
import NewProduct from './routes/NewProduct';
import ProductDetail from './routes/ProductDetail';
import Root from './routes/Root';
import Error from './routes/Error';

const router = createHashRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error/>,
    children: [
      {path: '/', element: <Home/>},
      {path: '/products', element: <ProductList/>},
      {path: '/products/:productId', element: <ProductDetail/>},
      {path: '/products/new', element: <NewProduct/>}
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router}/>;
}
