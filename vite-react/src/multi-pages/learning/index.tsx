import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/sass/main.scss';
import App from '@/multi-pages/learning/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
