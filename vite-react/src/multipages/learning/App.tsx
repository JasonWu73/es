import './App.scss';
import Card from '../../components/card/Card';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/Home';
import ProductList from './routes/ProductList';
import NewProduct from './routes/NewProduct';
import ProductDetail from './routes/ProductDetail';
import NotFound from '../../components/not-found/NotFound';

const router = createHashRouter([
  {path: '*', element: <NotFound/>},
  {path: '/', element: <Home/>},
  {path: '/products', element: <ProductList/>},
  {path: '/products/:id', element: <ProductDetail/>},
  {path: '/products/new', element: <NewProduct/>}
]);

// const router = createHashRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="*" element={<NotFound/>}/>
//       <Route path="/" element={<Home/>}/>
//       <Route path="/products" element={<ProductList/>}/>
//       <Route path="/products/:id" element={<ProductDetail/>}/>
//       <Route path="/products/new" element={<NewProduct/>}/>
//     </Route>
//   )
// );

export default function App() {
  return (
    <div className="app">
      <Card>
        <RouterProvider router={router}/>
      </Card>
    </div>
  );
}
