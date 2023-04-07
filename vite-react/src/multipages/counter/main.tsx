import './index.scss';
import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    {/* React-Redux allows React components to interact with a Redux store */}
    {/* Wrapping the app with `<Provider store={store}>` enables all components to use the store */}
    {/* Global state should go in the Redux store, local state should stay in React components */}
    <Provider store={store}>
      <App/>
    </Provider>
  </StrictMode>
);
