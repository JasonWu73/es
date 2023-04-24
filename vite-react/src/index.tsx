import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import AntDesign from './AntDesign';
import './nprogress';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AntDesign>
        <App />
      </AntDesign>
    </Provider>
  </React.StrictMode>
);
