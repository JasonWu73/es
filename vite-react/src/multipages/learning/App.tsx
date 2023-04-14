import './App.scss';
import Card from '../../components/card/Card';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/Home';
import ProductList from './routes/ProductList';

const router = createHashRouter([
  {path: '/', element: <Home/>},
  {path: '/products', element: <ProductList/>}
]);

export default function App() {
  return (
    <div className="app">
      <Card>
        <RouterProvider router={router}/>
      </Card>
    </div>
  );
}
