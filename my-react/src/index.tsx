import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import FoodOrderApp from './food-order/FoodOrderApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FoodOrderApp/>
    {/* <LoginApp/> */}
    {/* {<TodoApp/>} */}
  </React.StrictMode>
);
