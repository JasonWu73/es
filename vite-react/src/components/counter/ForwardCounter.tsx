import classes from './Counter.module.scss';
import { useState } from 'react';
import { useCounter } from '../../hooks/useCounter';

export default function ForwardCounter() {
  const [counter, setCounter] = useState(0);

  useCounter(setCounter, 'forward');

  return (
    <div className={classes.counter}>
      <h2>{counter}</h2>
    </div>
  );
}
