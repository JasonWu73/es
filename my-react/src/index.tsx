import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginApp from './login/LoginApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginApp/>
    {/* <TodoApp/> */}
  </React.StrictMode>
);
