import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <div>
      <h2>Let's get started!</h2>
    </div>
    {/* <LoginApp/> */}
    {/* {<TodoApp/>} */}
  </StrictMode>
);
