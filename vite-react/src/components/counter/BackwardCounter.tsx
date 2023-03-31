import classes from './Counter.module.scss';
import { useCounter } from '../../hooks/useCounter';
import { useState } from 'react';

export default function BackwardCounter() {
  const [counter, setCounter] = useState(0);

  useCounter(setCounter, 'backward');

  return (
    <div className={classes.counter}>
      <h2>{counter}</h2>
    </div>
  );
}
