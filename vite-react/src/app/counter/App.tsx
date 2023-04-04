import './App.scss';
import {Provider} from 'react-redux';
import store from './store';
import React from 'react';
import Counter from './features/counter/Counter';
import Card from '../../components/card/Card';

export default function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Card>
          <Counter/>
        </Card>
      </Provider>
    </div>
  );
}
