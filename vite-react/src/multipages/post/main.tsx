import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {HashRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    {/* Use `BrowserRouter` if not in multiple page */}
    <HashRouter>
      <App/>
    </HashRouter>
  </StrictMode>
);
