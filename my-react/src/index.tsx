import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import LoginApp from './login/LoginApp';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <LoginApp/>
    {/* {<TodoApp/>} */}
  </StrictMode>
);
