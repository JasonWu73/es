import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import FoodOrder from './food-order/FoodOrder';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <FoodOrder/>
    {/* <LoginApp/> */}
    {/* {<TodoApp/>} */}
  </StrictMode>
);
