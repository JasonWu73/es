import {Provider} from 'react-redux';
import store from './store';
import React from 'react';
import Counter from './features/counter/Counter';

export default function CounterApp() {
  return (
    <Provider store={store}>
      <Counter/>
    </Provider>
  );
}
