import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import LoginApp from './login/LoginApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <LoginApp/>
    {/* {<TodoApp/>} */}
  </>
);
