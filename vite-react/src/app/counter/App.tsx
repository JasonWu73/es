import './App.scss';
import React from 'react';
import Counter from './features/counter/Counter';
import Card from '../../components/card/Card';

export default function App() {
  return (
    <div className="app">
      <Card>
        <Counter/>
      </Card>
    </div>
  );
}
