import { createRoot } from 'react-dom/client';
import './index.scss';
import FoodOrderApp from './food-order/FoodOrderApp';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <FoodOrderApp/>
    {/* <LoginApp/> */}
    {/* {<TodoApp/>} */}
  </>
);
