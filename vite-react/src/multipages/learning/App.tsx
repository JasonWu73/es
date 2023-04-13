import './App.scss';
import Card from '../../components/card/Card';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/home/Home';

const router = createHashRouter([
  {path: '/', element: <Home/>}
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
