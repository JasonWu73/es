import React from 'react';
import ReactDOM from 'react-dom/client';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import App from './App';
import './index.scss';

NProgress.configure({ showSpinner: false });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
